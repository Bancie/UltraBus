type Bus = {
  busId: number;           
  licensePlate: string;    // Biển số xe
  capacity: number;        // Sức chứa hành khách
  currentRoute: RouteRecord; // Tuyến xe buýt hiện tại
  status: 'active' | 'inactive' | 'maintenance'; // Trạng thái hoạt động
};
