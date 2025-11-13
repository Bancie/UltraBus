export type LatLng = {
  lat: number;
  lng: number;
};

export type VehiclePosition = LatLng & {
  heading?: number;
  speedKmh?: number;
};

export type RouteStop = {
  stopId: string;
  name: string;
  position: LatLng;
  sequence: number;
  etaOffsetMinutes?: number;
};

export type TrackingStatus = 'idle' | 'enRoute' | 'completed' | 'offline';

export type BusTrackingSnapshot = {
  busId: string;
  routeId: number;
  driverId?: string;
  status: TrackingStatus;
  lastPosition: VehiclePosition;
  lastUpdatedAt: number;
  nextStopIndex: number;
  stops: RouteStop[];
};

export type UpcomingStop = RouteStop & {
  etaMinutes: number;
  distanceMeters: number;
};

export interface RouteStopProvider {
  getStopsForRoute(routeId: number): RouteStop[];
}

export interface MapNavigator {
  estimateTravelTime(origin: LatLng, destination: LatLng): Promise<number>;
}

export type StartTrackingPayload = {
  busId: string;
  routeId: number;
  driverId?: string;
  position: VehiclePosition;
  stops?: RouteStop[];
  nextStopIndex?: number;
};

type TrackingEvent = 'busStarted' | 'positionUpdated' | 'busStopped';
type TrackingListener = (snapshot: BusTrackingSnapshot) => void;

export default class BusTrackingController {
  private readonly records = new Map<string, BusTrackingSnapshot>();

  private readonly listeners = new Map<TrackingEvent, Set<TrackingListener>>();

  constructor(
    private readonly stopProvider?: RouteStopProvider,
    private readonly mapNavigator?: MapNavigator,
  ) {}

  startTracking(payload: StartTrackingPayload): BusTrackingSnapshot {
    const stops =
      payload.stops ?? this.stopProvider?.getStopsForRoute(payload.routeId)?.slice() ?? [];

    const snapshot: BusTrackingSnapshot = {
      busId: payload.busId,
      routeId: payload.routeId,
      driverId: payload.driverId,
      status: 'enRoute',
      lastPosition: payload.position,
      lastUpdatedAt: Date.now(),
      stops,
      nextStopIndex: this.resolveNextStopIndex(payload.position, stops, payload.nextStopIndex),
    };

    this.records.set(payload.busId, snapshot);
    this.emit('busStarted', snapshot);

    return { ...snapshot, stops: [...snapshot.stops] };
  }

  updatePosition(busId: string, position: VehiclePosition): BusTrackingSnapshot {
    const snapshot = this.assertSnapshot(busId);

    snapshot.lastPosition = { ...snapshot.lastPosition, ...position };
    snapshot.lastUpdatedAt = Date.now();
    snapshot.status = 'enRoute';
    snapshot.nextStopIndex = this.resolveNextStopIndex(
      snapshot.lastPosition,
      snapshot.stops,
      snapshot.nextStopIndex,
    );

    this.emit('positionUpdated', snapshot);
    return { ...snapshot, stops: [...snapshot.stops] };
  }

  stopTracking(busId: string, finalStatus: TrackingStatus = 'completed'): BusTrackingSnapshot {
    const snapshot = this.assertSnapshot(busId);

    snapshot.status = finalStatus;
    snapshot.lastUpdatedAt = Date.now();

    this.emit('busStopped', snapshot);
    return { ...snapshot, stops: [...snapshot.stops] };
  }

  getBusSnapshot(busId: string): BusTrackingSnapshot | undefined {
    const snapshot = this.records.get(busId);
    return snapshot ? { ...snapshot, stops: [...snapshot.stops] } : undefined;
  }

  listActiveBuses(): BusTrackingSnapshot[] {
    return Array.from(this.records.values())
      .filter((snapshot) => snapshot.status === 'enRoute')
      .map((snapshot) => ({ ...snapshot, stops: [...snapshot.stops] }));
  }

  async getUpcomingStops(busId: string, limit = 3): Promise<UpcomingStop[]> {
    const snapshot = this.assertSnapshot(busId);

    if (!snapshot.stops.length) {
      return [];
    }

    const startIndex = Math.min(snapshot.nextStopIndex, snapshot.stops.length - 1);
    const stops = snapshot.stops.slice(startIndex, startIndex + limit);

    const entries = await Promise.all(
      stops.map(async (stop) => {
        const distanceMeters = this.calculateDistanceMeters(snapshot.lastPosition, stop.position);
        const etaMinutes = await this.estimateEtaMinutes(snapshot.lastPosition, stop.position);

        return {
          ...stop,
          etaMinutes,
          distanceMeters,
        };
      }),
    );

    return entries;
  }

  on(event: TrackingEvent, listener: TrackingListener): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }

    this.listeners.get(event)!.add(listener);

    return () => this.off(event, listener);
  }

  off(event: TrackingEvent, listener: TrackingListener): void {
    this.listeners.get(event)?.delete(listener);
  }

  private assertSnapshot(busId: string): BusTrackingSnapshot {
    const snapshot = this.records.get(busId);

    if (!snapshot) {
      throw new Error(`Bus ${busId} is not being tracked.`);
    }

    return snapshot;
  }

  private resolveNextStopIndex(
    position: VehiclePosition,
    stops: RouteStop[],
    currentIndex = 0,
  ): number {
    if (!stops.length) {
      return 0;
    }

    let index = Math.max(currentIndex, 0);

    while (index < stops.length) {
      const stop = stops[index];
      const distance = this.calculateDistanceMeters(position, stop.position);

      if (distance > 80) {
        break;
      }

      index += 1;
    }

    return Math.min(index, stops.length - 1);
  }

  private async estimateEtaMinutes(origin: VehiclePosition, destination: LatLng): Promise<number> {
    if (this.mapNavigator) {
      return this.mapNavigator.estimateTravelTime(origin, destination);
    }

    const distanceMeters = this.calculateDistanceMeters(origin, destination);
    const speedKmh = Math.max(origin.speedKmh ?? 25, 5);

    return Math.round((distanceMeters / 1000 / speedKmh) * 60);
  }

  private calculateDistanceMeters(start: LatLng, end: LatLng): number {
    const earthRadius = 6371000;
    const toRad = (value: number) => (value * Math.PI) / 180;

    const deltaLat = toRad(end.lat - start.lat);
    const deltaLng = toRad(end.lng - start.lng);

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(toRad(start.lat)) *
        Math.cos(toRad(end.lat)) *
        Math.sin(deltaLng / 2) *
        Math.sin(deltaLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Math.round(earthRadius * c);
  }

  private emit(event: TrackingEvent, snapshot: BusTrackingSnapshot): void {
    this.listeners
      .get(event)
      ?.forEach((listener) => listener({ ...snapshot, stops: [...snapshot.stops] }));
  }
}
