# Thiết kế chức năng

## Module Quản lý phân công

### 1. Tổng quan

Module Quản lý phân công là một module trung tâm trong hệ thống Bus Smart, chịu trách nhiệm quản lý việc phân công xe buýt, tài xế, tuyến đường và học sinh. Module này tạo ra mối liên kết giữa các thực thể chính trong hệ thống, cho phép quản trị viên tạo, chỉnh sửa, xóa và theo dõi các phân công công việc.

### Đặc tả Use case (Use case description)

#### Use Case 1: Tạo phân công mới (Create Assignment)

| Trường                   | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Use case name**        | Tạo phân công mới                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Scenario**             | Quản trị viên tạo phân công mới cho xe buýt, tài xế và tuyến đường                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **Triggering event**     | Quản trị viên nhấn nút "Tạo phân công mới" trên giao diện quản lý                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Brief description**    | Quản trị viên tạo một phân công mới bằng cách chọn xe buýt, tài xế, tuyến đường, nhập số lượng học sinh và chọn trạng thái. Hệ thống sẽ tạo và lưu phân công mới vào danh sách.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Actors**               | Quản trị viên (Manager)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **Related use cases**    | Có thể được gọi từ Module Quản lý tuyến đường khi tạo tuyến mới cần phân công                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **Stakeholders**         | Quản trị viên, Tài xế, Học sinh, Phụ huynh                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **Preconditions**        | <ul><li>Hệ thống phải có ít nhất một xe buýt trong danh sách</li><li>Hệ thống phải có ít nhất một tài xế trong danh sách</li><li>Hệ thống phải có ít nhất một tuyến đường trong danh sách</li><li>Module AssignController phải sẵn sàng hoạt động</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| **Postconditions**       | <ul><li>Phân công mới phải được tạo và lưu vào danh sách</li><li>Phân công phải có ID duy nhất (timestamp)</li><li>Phân công phải được liên kết với xe buýt, tài xế và tuyến đường đã chọn</li><li>Lịch trình (schedule) phải được thiết lập với thời gian hiện tại</li><li>Danh sách phân công trên giao diện phải được cập nhật</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| **Flow of activities**   | <table><tr><th>Actor</th><th>System</th></tr><tr><td>1. Quản trị viên nhấn nút "Tạo phân công mới"</td><td>1.1 Hệ thống hiển thị dialog form tạo phân công<br>1.2 Hệ thống tải danh sách xe buýt, tài xế và tuyến đường vào các dropdown</td></tr><tr><td>2. Quản trị viên chọn xe buýt từ dropdown</td><td>2.1 Hệ thống lưu ID xe buýt đã chọn</td></tr><tr><td>3. Quản trị viên chọn tài xế từ dropdown</td><td>3.1 Hệ thống lưu ID tài xế đã chọn</td></tr><tr><td>4. Quản trị viên chọn tuyến đường từ dropdown</td><td>4.1 Hệ thống lưu ID tuyến đường đã chọn</td></tr><tr><td>5. Quản trị viên nhập số lượng học sinh</td><td>5.1 Hệ thống validate số học sinh (phải >= 0)</td></tr><tr><td>6. Quản trị viên chọn trạng thái (hoạt động, bảo trì, tạm dừng)</td><td>6.1 Hệ thống lưu trạng thái đã chọn</td></tr><tr><td>7. Quản trị viên nhấn nút "Tạo phân công"</td><td>7.1 Hệ thống validate dữ liệu (kiểm tra đã chọn đầy đủ xe, tài xế, tuyến đường)<br>7.2 Hệ thống tạo AssignRecord mới với ID = Date.now()<br>7.3 Hệ thống gọi assignController.addAssign()<br>7.4 Hệ thống cập nhật danh sách phân công trên giao diện<br>7.5 Hệ thống đóng dialog và reset form</td></tr></table> |
| **Exception conditions** | <ul><li>1.1 Nếu không có xe buýt, tài xế hoặc tuyến đường nào trong hệ thống: Hiển thị thông báo lỗi và không cho phép tạo phân công</li><li>7.1 Nếu thiếu thông tin (chưa chọn xe, tài xế hoặc tuyến đường): Hiển thị lỗi "Vui lòng chọn đầy đủ xe, tài xế và tuyến đường"</li><li>7.3 Nếu ID phân công đã tồn tại: Ném exception và hiển thị lỗi "Route with id {id} already exists"</li><li>7.3 Nếu số học sinh không hợp lệ (< 0): Tự động đặt về 0</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

#### Use Case 2: Chỉnh sửa phân công (Edit Assignment)

| Trường                   | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Use case name**        | Chỉnh sửa phân công                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| **Scenario**             | Quản trị viên chỉnh sửa thông tin của một phân công hiện có                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Triggering event**     | Quản trị viên nhấn nút "Edit" trên một phân công trong bảng danh sách                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **Brief description**    | Quản trị viên chỉnh sửa thông tin phân công bằng cách cập nhật xe buýt, tài xế, tuyến đường, số lượng học sinh hoặc trạng thái. Hệ thống sẽ cập nhật và lưu thay đổi.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **Actors**               | Quản trị viên (Manager)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Related use cases**    | Có thể được gọi sau khi xem danh sách phân công                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **Stakeholders**         | Quản trị viên, Tài xế, Học sinh, Phụ huynh                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **Preconditions**        | <ul><li>Phân công cần chỉnh sửa phải tồn tại trong hệ thống</li><li>Hệ thống phải có ít nhất một xe buýt, tài xế và tuyến đường trong danh sách</li><li>Module AssignController phải sẵn sàng hoạt động</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| **Postconditions**       | <ul><li>Phân công phải được cập nhật với thông tin mới</li><li>ID phân công không được thay đổi</li><li>Danh sách phân công trên giao diện phải được cập nhật</li><li>Dialog chỉnh sửa phải được đóng</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **Flow of activities**   | <table><tr><th>Actor</th><th>System</th></tr><tr><td>1. Quản trị viên nhấn nút "Edit" trên một phân công</td><td>1.1 Hệ thống lấy thông tin phân công theo ID<br>1.2 Hệ thống tìm kiếm ID tương ứng của bus, driver, route từ tên<br>1.3 Hệ thống điền sẵn form với dữ liệu hiện tại<br>1.4 Hệ thống mở dialog chỉnh sửa</td></tr><tr><td>2. Quản trị viên chỉnh sửa thông tin (xe, tài xế, tuyến đường, số học sinh, trạng thái)</td><td>2.1 Hệ thống cập nhật form data theo thay đổi của người dùng</td></tr><tr><td>3. Quản trị viên nhấn nút "Cập nhật phân công"</td><td>3.1 Hệ thống validate dữ liệu (kiểm tra đã chọn đầy đủ xe, tài xế, tuyến đường)<br>3.2 Hệ thống kiểm tra phân công có tồn tại không<br>3.3 Hệ thống gọi assignController.editAssign()<br>3.4 Hệ thống cập nhật danh sách phân công trên giao diện<br>3.5 Hệ thống đóng dialog và reset form</td></tr></table> |
| **Exception conditions** | <ul><li>1.2 Nếu không tìm thấy ID tương ứng của bus, driver hoặc route: Để trống field tương ứng trong form</li><li>3.1 Nếu thiếu thông tin: Hiển thị lỗi "Vui lòng chọn đầy đủ xe, tài xế và tuyến đường"</li><li>3.2 Nếu phân công không tồn tại: Hiển thị lỗi "Không tìm thấy phân công cần chỉnh sửa"</li><li>3.3 Nếu phân công không tồn tại: Ném exception "Assignment with id {id} does not exist"</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |

#### Use Case 3: Xóa phân công (Delete Assignment)

| Trường                   | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Use case name**        | Xóa phân công                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Scenario**             | Quản trị viên xóa một phân công khỏi hệ thống                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Triggering event**     | Quản trị viên nhấn nút "Xóa" trong dialog chỉnh sửa phân công                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Brief description**    | Quản trị viên xác nhận xóa một phân công. Hệ thống sẽ xóa phân công khỏi danh sách và cập nhật giao diện.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **Actors**               | Quản trị viên (Manager)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| **Related use cases**    | Thường được gọi sau khi chỉnh sửa phân công (trong cùng dialog)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Stakeholders**         | Quản trị viên, Tài xế, Học sinh, Phụ huynh                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **Preconditions**        | <ul><li>Phân công cần xóa phải tồn tại trong hệ thống</li><li>Dialog chỉnh sửa phải đang mở</li><li>Module AssignController phải sẵn sàng hoạt động</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Postconditions**       | <ul><li>Phân công phải được xóa khỏi danh sách</li><li>Danh sách phân công trên giao diện phải được cập nhật</li><li>Dialog chỉnh sửa phải được đóng</li><li>Form phải được reset</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Flow of activities**   | <table><tr><th>Actor</th><th>System</th></tr><tr><td>1. Quản trị viên nhấn nút "Xóa" trong dialog chỉnh sửa</td><td>1.1 Hệ thống hiển thị AlertDialog xác nhận xóa</td></tr><tr><td>2. Quản trị viên xem thông báo xác nhận</td><td>2.1 Hệ thống hiển thị thông báo "Bạn có chắc chắn muốn xóa phân công này? Hành động này không thể hoàn tác."</td></tr><tr><td>3. Quản trị viên nhấn nút "Xóa" để xác nhận</td><td>3.1 Hệ thống gọi assignController.removeAssign() với ID phân công<br>3.2 Hệ thống xóa phân công khỏi danh sách<br>3.3 Hệ thống cập nhật danh sách phân công trên giao diện<br>3.4 Hệ thống đóng AlertDialog và dialog chỉnh sửa<br>3.5 Hệ thống reset form</td></tr><tr><td>4. (Alternative) Quản trị viên nhấn "Hủy"</td><td>4.1 Hệ thống đóng AlertDialog, giữ nguyên dialog chỉnh sửa</td></tr></table> |
| **Exception conditions** | <ul><li>3.1 Nếu phân công không tồn tại: Ném exception "Assignment with id {id} does not exist" và hiển thị lỗi "Không thể xóa phân công"</li><li>3.2 Nếu có lỗi trong quá trình xóa: Hiển thị thông báo lỗi và không xóa phân công</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

#### Use Case 4: Xem danh sách phân công (View Assignments)

| Trường                   | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Use case name**        | Xem danh sách phân công                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Scenario**             | Quản trị viên xem danh sách tất cả các phân công hiện có trong hệ thống                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Triggering event**     | Quản trị viên truy cập trang Quản lý và điều khiển hoặc chọn tab "Phân công công việc"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **Brief description**    | Quản trị viên xem danh sách tất cả các phân công được hiển thị dưới dạng bảng với thông tin về xe buýt, tài xế, tuyến đường, số học sinh và trạng thái.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Actors**               | Quản trị viên (Manager)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Related use cases**    | Được gọi trước khi thực hiện chỉnh sửa hoặc xóa phân công                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Stakeholders**         | Quản trị viên, Tài xế, Học sinh, Phụ huynh                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **Preconditions**        | <ul><li>Module AssignController phải sẵn sàng hoạt động</li><li>Component Manager phải được khởi tạo</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **Postconditions**       | <ul><li>Danh sách phân công phải được hiển thị trên giao diện</li><li>Mỗi phân công phải hiển thị đầy đủ thông tin: xe buýt, tài xế, tuyến đường, số học sinh, trạng thái</li><li>Trạng thái phải được hiển thị với Badge màu sắc phù hợp</li><li>Mỗi phân công phải có nút "Edit" để chỉnh sửa</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Flow of activities**   | <table><tr><th>Actor</th><th>System</th></tr><tr><td>1. Quản trị viên truy cập trang Quản lý</td><td>1.1 Hệ thống khởi tạo AssignController<br>1.2 Hệ thống gọi assignController.getAssign() để lấy danh sách phân công<br>1.3 Hệ thống lưu danh sách vào state</td></tr><tr><td>2. Quản trị viên chọn tab "Phân công công việc"</td><td>2.1 Hệ thống hiển thị bảng danh sách phân công</td></tr><tr><td>3. Quản trị viên xem danh sách phân công</td><td>3.1 Hệ thống hiển thị bảng với các cột:<br>- Xe buýt<br>- Tài xế<br>- Tuyến đường<br>- Học sinh<br>- Trạng thái (với Badge màu sắc)<br>- Nút chỉnh sửa<br>3.2 Hệ thống hiển thị trạng thái với màu:<br>- "hoạt động": Badge màu xanh lá<br>- Khác: Badge màu cam</td></tr></table> |
| **Exception conditions** | <ul><li>1.2 Nếu không có phân công nào: Hiển thị bảng trống</li><li>1.2 Nếu có lỗi khi tải dữ liệu: Hiển thị thông báo lỗi</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

**Vị trí trong hệ thống:**

- Controller: `Bus-Smart-app/app/controllers/AssignController.ts`
- UI Component: `Bus-Smart-app/app/components/app/pages/Manager.tsx`
- Model: `Bus-Smart-app/app/models/ModelAsign.ts`

### 2. Mục đích

Module này được thiết kế để:

- Quản lý việc phân công tài xế cho từng xe buýt
- Liên kết xe buýt với tuyến đường cụ thể
- Theo dõi số lượng học sinh trên mỗi phân công
- Quản lý trạng thái hoạt động của các phân công (hoạt động, bảo trì, tạm dừng)
- Cung cấp giao diện quản lý trực quan cho quản trị viên
- Hỗ trợ các thao tác CRUD (Create, Read, Update, Delete) đầy đủ

### 3. Kiến trúc và thành phần

#### 3.1. AssignController (Controller Layer)

`AssignController` là lớp điều khiển chính, quản lý logic nghiệp vụ và dữ liệu phân công.

**Các thành phần:**

- `assignments: AssignRecord[]` - Danh sách các phân công
- `routesController: Routes` - Controller quản lý tuyến đường
- `driverController: Driver` - Controller quản lý tài xế
- `busController: Bus` - Controller quản lý xe buýt

**Các phương thức chính:**

| Phương thức                     | Mô tả                             | Tham số                                              | Giá trị trả về              |
| ------------------------------- | --------------------------------- | ---------------------------------------------------- | --------------------------- |
| `getAssign()`                   | Lấy danh sách tất cả phân công    | -                                                    | `AssignRecord[]`            |
| `getAssignById(id)`             | Lấy phân công theo ID             | `id: number`                                         | `AssignRecord \| undefined` |
| `addAssign(assign)`             | Thêm phân công mới                | `assign: AssignRecord`                               | `AssignRecord`              |
| `editAssign(id, updatedAssign)` | Cập nhật phân công                | `id: number`, `updatedAssign: Partial<AssignRecord>` | `AssignRecord`              |
| `removeAssign(id)`              | Xóa phân công                     | `id: number`                                         | `void`                      |
| `getRoutes()`                   | Lấy danh sách tuyến đường         | -                                                    | `RouteRecord[]`             |
| `getRouteById(id)`              | Lấy tuyến đường theo ID           | `id: number`                                         | `RouteRecord \| undefined`  |
| `getWayPoints(id)`              | Lấy danh sách điểm dừng của tuyến | `id: number`                                         | `Waypoint[] \| undefined`   |
| `getDrivers()`                  | Lấy danh sách tài xế              | -                                                    | `DriverRecord[]`            |
| `getDriverById(id)`             | Lấy tài xế theo ID                | `id: number`                                         | `DriverRecord \| undefined` |
| `getBus()`                      | Lấy danh sách xe buýt             | -                                                    | `BusRecord[]`               |
| `getBusById(id)`                | Lấy xe buýt theo ID               | `id: number`                                         | `BusRecord \| undefined`    |
| `getSchedule()`                 | Lấy lịch trình phân công          | -                                                    | `AssignRecord[]`            |
| `getScheduleById(id)`           | Lấy lịch trình theo ID            | `id: number`                                         | `AssignRecord \| undefined` |

#### 3.2. Manager Component (Presentation Layer)

Component React quản lý giao diện người dùng cho module phân công.

**Các tính năng UI:**

- Tab "Phân công công việc": Hiển thị và quản lý các phân công
- Tab "Tuyến đường": Quản lý tuyến đường (tích hợp trong cùng component)
- Dialog tạo phân công mới
- Dialog chỉnh sửa phân công
- Bảng hiển thị danh sách phân công
- Xác nhận xóa phân công (AlertDialog)

### 4. Cấu trúc dữ liệu

#### 4.1. AssignRecord

Định nghĩa cấu trúc dữ liệu cho một phân công:

```typescript
type AssignRecord = {
  id: number; // ID duy nhất của phân công
  bus: string; // Tên xe buýt
  driver: string; // Tên tài xế
  route: string; // Tên tuyến đường
  students: number; // Số lượng học sinh
  status: string; // Trạng thái: "hoạt động", "bảo trì", "tạm dừng"
  schedule: Date; // Lịch trình (thời gian)
  wayPoints?: Waypoint[]; // Danh sách điểm dừng (tùy chọn)
};
```

#### 4.2. Waypoint

Định nghĩa điểm dừng trên tuyến đường:

```typescript
type Waypoint = {
  id: number; // ID điểm dừng
  name: string; // Tên điểm dừng
  lat: number; // Vĩ độ
  lng: number; // Kinh độ
};
```

### 5. Các chức năng chính

#### 5.1. Tạo phân công mới

**Luồng xử lý:**

1. Người dùng nhấn nút "Tạo phân công mới"
2. Dialog hiển thị form với các trường:
   - Chọn xe buýt (dropdown)
   - Chọn tài xế (dropdown)
   - Chọn tuyến đường (dropdown)
   - Nhập số học sinh (number input)
   - Chọn trạng thái (dropdown: hoạt động, bảo trì, tạm dừng)
3. Validate dữ liệu: Kiểm tra đã chọn đầy đủ xe, tài xế và tuyến đường
4. Tạo `AssignRecord` mới với:
   - `id`: Timestamp hiện tại (`Date.now()`)
   - `schedule`: Thời gian hiện tại
   - Các thông tin từ form
5. Gọi `assignController.addAssign()` để thêm vào danh sách
6. Cập nhật UI với danh sách phân công mới

**Xử lý lỗi:**

- Nếu thiếu thông tin: Hiển thị lỗi "Vui lòng chọn đầy đủ xe, tài xế và tuyến đường"
- Nếu ID đã tồn tại: Ném exception từ controller

#### 5.2. Chỉnh sửa phân công

**Luồng xử lý:**

1. Người dùng nhấn nút "Edit" trên một phân công trong bảng
2. Hệ thống tìm kiếm ID tương ứng của bus, driver, route từ tên
3. Dialog chỉnh sửa hiển thị với dữ liệu hiện tại đã được điền sẵn
4. Người dùng chỉnh sửa thông tin
5. Validate dữ liệu
6. Gọi `assignController.editAssign()` để cập nhật
7. Cập nhật UI

**Xử lý lỗi:**

- Nếu không tìm thấy phân công: Hiển thị "Không tìm thấy phân công cần chỉnh sửa"
- Nếu thiếu thông tin: Hiển thị lỗi validation

#### 5.3. Xóa phân công

**Luồng xử lý:**

1. Người dùng nhấn nút "Xóa" trong dialog chỉnh sửa
2. AlertDialog hiển thị xác nhận xóa
3. Nếu xác nhận, gọi `assignController.removeAssign()`
4. Cập nhật UI và đóng dialog

**Xử lý lỗi:**

- Nếu không tìm thấy phân công: Ném exception từ controller

#### 5.4. Hiển thị danh sách phân công

**Luồng xử lý:**

1. Component khởi tạo với dữ liệu từ `assignController.getAssign()`
2. Hiển thị bảng với các cột:
   - Xe buýt
   - Tài xế
   - Tuyến đường
   - Học sinh
   - Trạng thái (với Badge màu sắc)
   - Nút chỉnh sửa
3. Trạng thái được hiển thị với màu:
   - "hoạt động": Badge màu xanh lá
   - Khác: Badge màu cam

### 6. Phụ thuộc và tích hợp

#### 6.1. Phụ thuộc vào các module khác

Module này phụ thuộc vào:

- **Module Quản lý tuyến đường** (`Routes`): Để lấy thông tin tuyến đường và điểm dừng
- **Module Quản lý tài xế** (`Driver`): Để lấy danh sách và thông tin tài xế
- **Module Quản lý xe buýt** (`Bus`): Để lấy danh sách và thông tin xe buýt

#### 6.2. Tích hợp với UI Components

Sử dụng các component từ thư viện UI:

- `Card`, `CardContent`, `CardHeader`, `CardTitle`, `CardDescription`
- `Table`, `TableBody`, `TableCell`, `TableHead`, `TableHeader`, `TableRow`
- `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`
- `AlertDialog` cho xác nhận xóa
- `Select`, `Input`, `Label`, `Button`, `Badge`, `Tabs`

### 7. Xử lý lỗi và validation

#### 7.1. Validation phía client

- **Tạo phân công:**

  - Kiểm tra đã chọn xe buýt
  - Kiểm tra đã chọn tài xế
  - Kiểm tra đã chọn tuyến đường
  - Số học sinh phải là số hợp lệ (>= 0)

- **Chỉnh sửa phân công:**
  - Tương tự như tạo phân công
  - Kiểm tra phân công tồn tại trước khi chỉnh sửa

#### 7.2. Xử lý lỗi từ Controller

- `addAssign()`: Ném lỗi nếu ID đã tồn tại
- `editAssign()`: Ném lỗi nếu phân công không tồn tại
- `removeAssign()`: Ném lỗi nếu phân công không tồn tại

Tất cả lỗi được bắt và hiển thị trong UI thông qua state `assignError`.

### 8. Trạng thái và quản lý state

Component sử dụng React hooks để quản lý state:

- `assignments`: Danh sách phân công hiện tại
- `routeList`: Danh sách tuyến đường
- `busList`: Danh sách xe buýt
- `driverList`: Danh sách tài xế
- `assignForm`: Form data cho tạo/chỉnh sửa
- `editingAssignmentId`: ID phân công đang chỉnh sửa
- `isEditDialogOpen`: Trạng thái mở/đóng dialog chỉnh sửa
- `assignError`: Thông báo lỗi

### 9. Mở rộng trong tương lai

Các tính năng có thể mở rộng:

- Lọc và tìm kiếm phân công
- Sắp xếp phân công theo các tiêu chí
- Xuất báo cáo phân công
- Lịch trình phân công theo tuần/tháng
- Thông báo khi có thay đổi phân công
- Phân quyền cho các loại người dùng khác nhau

## Module Quản lý tuyến đường

### 1. Tổng quan

Module Quản lý tuyến đường là một module cốt lõi trong hệ thống Bus Smart, chịu trách nhiệm quản lý các tuyến đường xe buýt trong hệ thống. Module này cho phép quản trị viên tạo, chỉnh sửa, xóa và xem thông tin chi tiết về các tuyến đường, bao gồm số điểm dừng, khoảng cách, thời gian trung bình và số lượng xe phân công. Module này cung cấp nền tảng dữ liệu cho việc phân công xe buýt và tài xế trong Module Quản lý phân công.

### Đặc tả Use case (Use case description)

#### Use Case 1: Tạo tuyến đường mới (Create Route)

| Trường                   | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Use case name**        | Tạo tuyến đường mới                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Scenario**             | Quản trị viên tạo một tuyến đường mới với thông tin về điểm dừng, khoảng cách, thời gian và số xe phân công                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| **Triggering event**     | Quản trị viên nhấn nút "Tạo tuyến đường" trong tab "Tuyến đường" trên giao diện quản lý                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **Brief description**    | Quản trị viên tạo một tuyến đường mới bằng cách nhập tên tuyến, số lượng điểm dừng, khoảng cách, thời gian trung bình và số xe phân công. Hệ thống sẽ tự động chuẩn hóa định dạng khoảng cách (thêm "km") và thời gian (thêm "min") nếu chưa có, sau đó tạo và lưu tuyến đường mới vào danh sách.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Actors**               | Quản trị viên (Manager)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **Related use cases**    | Tuyến đường mới có thể được sử dụng trong Module Quản lý phân công để phân công xe và tài xế                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Stakeholders**         | Quản trị viên, Tài xế, Học sinh, Phụ huynh                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **Preconditions**        | <ul><li>Module RoutesController phải sẵn sàng hoạt động</li><li>Component Manager phải được khởi tạo</li><li>Dialog tạo tuyến đường phải có thể mở được</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Postconditions**       | <ul><li>Tuyến đường mới phải được tạo và lưu vào danh sách</li><li>Tuyến đường phải có ID duy nhất (timestamp)</li><li>Khoảng cách phải được chuẩn hóa với đơn vị "km"</li><li>Thời gian trung bình phải được chuẩn hóa với đơn vị "min"</li><li>Danh sách tuyến đường trên giao diện phải được cập nhật</li><li>Dialog tạo tuyến đường phải được đóng</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **Flow of activities**   | <table><tr><th>Actor</th><th>System</th></tr><tr><td>1. Quản trị viên nhấn nút "Tạo tuyến đường"</td><td>1.1 Hệ thống hiển thị dialog form tạo tuyến đường<br>1.2 Hệ thống reset các trường form về giá trị mặc định</td></tr><tr><td>2. Quản trị viên nhập tên tuyến đường</td><td>2.1 Hệ thống lưu tên tuyến đường vào state</td></tr><tr><td>3. Quản trị viên nhập số lượng điểm dừng</td><td>3.1 Hệ thống validate số điểm dừng (phải là số >= 0)</td></tr><tr><td>4. Quản trị viên nhập khoảng cách</td><td>4.1 Hệ thống lưu khoảng cách vào state</td></tr><tr><td>5. Quản trị viên nhập thời gian trung bình</td><td>5.1 Hệ thống lưu thời gian trung bình vào state</td></tr><tr><td>6. Quản trị viên nhập số xe phân công</td><td>6.1 Hệ thống validate số xe (phải là số >= 0)</td></tr><tr><td>7. Quản trị viên nhấn nút "Tạo tuyến đường"</td><td>7.1 Hệ thống validate dữ liệu (kiểm tra tên tuyến đường không được trống)<br>7.2 Hệ thống chuẩn hóa khoảng cách (thêm "km" nếu chưa có)<br>7.3 Hệ thống chuẩn hóa thời gian (thêm "min" nếu chưa có)<br>7.4 Hệ thống tạo RouteRecord mới với ID = Date.now()<br>7.5 Hệ thống gọi routesController.addRoute()<br>7.6 Hệ thống cập nhật danh sách tuyến đường trên giao diện<br>7.7 Hệ thống đóng dialog và reset form</td></tr></table> |
| **Exception conditions** | <ul><li>7.1 Nếu tên tuyến đường trống: Hiển thị lỗi "Vui lòng nhập tên tuyến đường"</li><li>7.4 Nếu ID tuyến đường đã tồn tại: Ném exception "Route with id {id} already exists" và hiển thị lỗi "Không thể tạo tuyến đường"</li><li>7.2-7.3 Nếu khoảng cách hoặc thời gian trống: Tự động đặt về "0 km" hoặc "0 min"</li><li>3.1, 6.1 Nếu số điểm dừng hoặc số xe không hợp lệ: Tự động đặt về 0</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |

#### Use Case 2: Chỉnh sửa tuyến đường (Edit Route)

| Trường                   | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Use case name**        | Chỉnh sửa tuyến đường                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **Scenario**             | Quản trị viên chỉnh sửa thông tin của một tuyến đường hiện có                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **Triggering event**     | Quản trị viên nhấn nút "Chỉnh sửa" trên một tuyến đường trong danh sách                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **Brief description**    | Quản trị viên chỉnh sửa thông tin tuyến đường bằng cách cập nhật tên, số điểm dừng, khoảng cách, thời gian trung bình hoặc số xe phân công. Hệ thống sẽ tự động trích xuất số từ các trường khoảng cách và thời gian (nếu có đơn vị), sau đó chuẩn hóa lại khi lưu.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Actors**               | Quản trị viên (Manager)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **Related use cases**    | Có thể được gọi sau khi xem danh sách tuyến đường                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **Stakeholders**         | Quản trị viên, Tài xế, Học sinh, Phụ huynh                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Preconditions**        | <ul><li>Tuyến đường cần chỉnh sửa phải tồn tại trong hệ thống</li><li>Module RoutesController phải sẵn sàng hoạt động</li><li>Dialog chỉnh sửa phải có thể mở được</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| **Postconditions**       | <ul><li>Tuyến đường phải được cập nhật với thông tin mới</li><li>ID tuyến đường không được thay đổi</li><li>Khoảng cách và thời gian phải được chuẩn hóa</li><li>Danh sách tuyến đường trên giao diện phải được cập nhật</li><li>Dialog chỉnh sửa phải được đóng</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Flow of activities**   | <table><tr><th>Actor</th><th>System</th></tr><tr><td>1. Quản trị viên nhấn nút "Chỉnh sửa" trên một tuyến đường</td><td>1.1 Hệ thống lấy thông tin tuyến đường theo ID<br>1.2 Hệ thống trích xuất số từ khoảng cách (ví dụ: "18.5 km" -> "18.5")<br>1.3 Hệ thống trích xuất số từ thời gian (ví dụ: "45 min" -> "45")<br>1.4 Hệ thống điền sẵn form với dữ liệu hiện tại<br>1.5 Hệ thống mở dialog chỉnh sửa</td></tr><tr><td>2. Quản trị viên chỉnh sửa thông tin (tên, điểm dừng, khoảng cách, thời gian, số xe)</td><td>2.1 Hệ thống cập nhật form data theo thay đổi của người dùng</td></tr><tr><td>3. Quản trị viên nhấn nút "Cập nhật"</td><td>3.1 Hệ thống validate dữ liệu (kiểm tra tên tuyến đường không được trống)<br>3.2 Hệ thống chuẩn hóa khoảng cách (thêm "km" nếu chưa có)<br>3.3 Hệ thống chuẩn hóa thời gian (thêm "min" nếu chưa có)<br>3.4 Hệ thống kiểm tra tuyến đường có tồn tại không<br>3.5 Hệ thống gọi routesController.editRoute()<br>3.6 Hệ thống cập nhật danh sách tuyến đường trên giao diện<br>3.7 Hệ thống đóng dialog và reset form</td></tr></table> |
| **Exception conditions** | <ul><li>1.2-1.3 Nếu không thể trích xuất số: Để trống field tương ứng trong form</li><li>3.1 Nếu tên tuyến đường trống: Hiển thị lỗi "Vui lòng nhập tên tuyến đường"</li><li>3.4 Nếu tuyến đường không tồn tại: Hiển thị lỗi "Không tìm thấy tuyến đường cần chỉnh sửa"</li><li>3.5 Nếu tuyến đường không tồn tại: Ném exception "Route with id {id} does not exist"</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

#### Use Case 3: Xóa tuyến đường (Delete Route)

| Trường                   | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Use case name**        | Xóa tuyến đường                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Scenario**             | Quản trị viên xóa một tuyến đường khỏi hệ thống                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Triggering event**     | Quản trị viên nhấn nút "Xóa" trong dialog chỉnh sửa tuyến đường                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Brief description**    | Quản trị viên xác nhận xóa một tuyến đường. Hệ thống sẽ xóa tuyến đường khỏi danh sách và cập nhật giao diện. Lưu ý: Xóa tuyến đường có thể ảnh hưởng đến các phân công đang sử dụng tuyến đường này.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **Actors**               | Quản trị viên (Manager)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **Related use cases**    | Thường được gọi sau khi chỉnh sửa tuyến đường (trong cùng dialog)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **Stakeholders**         | Quản trị viên, Tài xế, Học sinh, Phụ huynh                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **Preconditions**        | <ul><li>Tuyến đường cần xóa phải tồn tại trong hệ thống</li><li>Dialog chỉnh sửa phải đang mở</li><li>Module RoutesController phải sẵn sàng hoạt động</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Postconditions**       | <ul><li>Tuyến đường phải được xóa khỏi danh sách</li><li>Danh sách tuyến đường trên giao diện phải được cập nhật</li><li>Dialog chỉnh sửa phải được đóng</li><li>Form phải được reset</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Flow of activities**   | <table><tr><th>Actor</th><th>System</th></tr><tr><td>1. Quản trị viên nhấn nút "Xóa" trong dialog chỉnh sửa</td><td>1.1 Hệ thống hiển thị AlertDialog xác nhận xóa</td></tr><tr><td>2. Quản trị viên xem thông báo xác nhận</td><td>2.1 Hệ thống hiển thị thông báo "Bạn có chắc chắn muốn xóa tuyến đường này? Hành động này không thể hoàn tác."</td></tr><tr><td>3. Quản trị viên nhấn nút "Xóa" để xác nhận</td><td>3.1 Hệ thống gọi routesController.removeRoute() với ID tuyến đường<br>3.2 Hệ thống xóa tuyến đường khỏi danh sách<br>3.3 Hệ thống cập nhật danh sách tuyến đường trên giao diện<br>3.4 Hệ thống đóng AlertDialog và dialog chỉnh sửa<br>3.5 Hệ thống reset form</td></tr><tr><td>4. (Alternative) Quản trị viên nhấn "Hủy"</td><td>4.1 Hệ thống đóng AlertDialog, giữ nguyên dialog chỉnh sửa</td></tr></table> |
| **Exception conditions** | <ul><li>3.1 Nếu tuyến đường không tồn tại: Ném exception "Route with id {id} does not exist" và hiển thị lỗi "Không thể xóa tuyến đường"</li><li>3.2 Nếu có lỗi trong quá trình xóa: Hiển thị thông báo lỗi và không xóa tuyến đường</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |

#### Use Case 4: Xem danh sách tuyến đường (View Routes)

| Trường                   | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Use case name**        | Xem danh sách tuyến đường                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Scenario**             | Quản trị viên xem danh sách tất cả các tuyến đường hiện có trong hệ thống                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Triggering event**     | Quản trị viên truy cập trang Quản lý và điều khiển hoặc chọn tab "Tuyến đường"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| **Brief description**    | Quản trị viên xem danh sách tất cả các tuyến đường được hiển thị dưới dạng grid với thông tin về tên tuyến, số điểm dừng, khoảng cách, thời gian trung bình và số xe phân công. Mỗi tuyến đường có nút "Chỉnh sửa" để thực hiện các thao tác chỉnh sửa hoặc xóa.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **Actors**               | Quản trị viên (Manager)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Related use cases**    | Được gọi trước khi thực hiện chỉnh sửa hoặc xóa tuyến đường                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| **Stakeholders**         | Quản trị viên, Tài xế, Học sinh, Phụ huynh                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **Preconditions**        | <ul><li>Module RoutesController phải sẵn sàng hoạt động</li><li>Component Manager phải được khởi tạo</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| **Postconditions**       | <ul><li>Danh sách tuyến đường phải được hiển thị trên giao diện</li><li>Mỗi tuyến đường phải hiển thị đầy đủ thông tin: tên, số điểm dừng, khoảng cách, thời gian trung bình, số xe phân công</li><li>Mỗi tuyến đường phải có nút "Chỉnh sửa" để chỉnh sửa</li><li>Danh sách được hiển thị dưới dạng grid 2 cột trên màn hình lớn, 1 cột trên màn hình nhỏ</li></ul>                                                                                                                                                                                                                                                                                                                                                                                       |
| **Flow of activities**   | <table><tr><th>Actor</th><th>System</th></tr><tr><td>1. Quản trị viên truy cập trang Quản lý</td><td>1.1 Hệ thống khởi tạo RoutesController<br>1.2 Hệ thống gọi routesController.getRoutes() để lấy danh sách tuyến đường<br>1.3 Hệ thống lưu danh sách vào state</td></tr><tr><td>2. Quản trị viên chọn tab "Tuyến đường"</td><td>2.1 Hệ thống hiển thị grid danh sách tuyến đường</td></tr><tr><td>3. Quản trị viên xem danh sách tuyến đường</td><td>3.1 Hệ thống hiển thị grid với các card tuyến đường, mỗi card chứa:<br>- Tên tuyến đường<br>- Số điểm dừng<br>- Khoảng cách<br>- Thời gian trung bình<br>- Số xe phân công<br>- Nút chỉnh sửa<br>3.2 Hệ thống hiển thị grid responsive: 2 cột trên md trở lên, 1 cột trên mobile</td></tr></table> |
| **Exception conditions** | <ul><li>1.2 Nếu không có tuyến đường nào: Hiển thị grid trống</li><li>1.2 Nếu có lỗi khi tải dữ liệu: Hiển thị thông báo lỗi</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

**Vị trí trong hệ thống:**

- Controller: `Bus-Smart-app/app/controllers/Routes.ts`
- UI Component: `Bus-Smart-app/app/components/app/pages/Manager.tsx` (Tab "Tuyến đường")
- Model: `Bus-Smart-app/app/models/ModelRoutes.ts`

### 2. Mục đích

Module này được thiết kế để:

- Quản lý thông tin các tuyến đường xe buýt trong hệ thống
- Cung cấp dữ liệu tuyến đường cho Module Quản lý phân công
- Theo dõi thông tin chi tiết về mỗi tuyến đường: số điểm dừng, khoảng cách, thời gian trung bình
- Quản lý số lượng xe buýt được phân công cho mỗi tuyến đường
- Hỗ trợ quản lý điểm dừng (waypoints) cho mỗi tuyến đường
- Cung cấp giao diện quản lý trực quan cho quản trị viên
- Hỗ trợ các thao tác CRUD (Create, Read, Update, Delete) đầy đủ

### 3. Kiến trúc và thành phần

#### 3.1. RoutesController (Controller Layer)

`RoutesController` (class `Routes`) là lớp điều khiển chính, quản lý logic nghiệp vụ và dữ liệu tuyến đường.

**Các thành phần:**

- `routes: RouteRecord[]` - Danh sách các tuyến đường (private)
- Constructor nhận `initialRoutes` (mặc định là `defaultRoutes` từ model)

**Các phương thức chính:**

| Phương thức                   | Mô tả                             | Tham số                                            | Giá trị trả về             |
| ----------------------------- | --------------------------------- | -------------------------------------------------- | -------------------------- |
| `getRoutes()`                 | Lấy danh sách tất cả tuyến đường  | -                                                  | `RouteRecord[]`            |
| `getRouteById(id)`            | Lấy tuyến đường theo ID           | `id: number`                                       | `RouteRecord \| undefined` |
| `addRoute(route)`             | Thêm tuyến đường mới              | `route: RouteRecord`                               | `RouteRecord`              |
| `editRoute(id, updatedRoute)` | Cập nhật tuyến đường              | `id: number`, `updatedRoute: Partial<RouteRecord>` | `RouteRecord`              |
| `removeRoute(id)`             | Xóa tuyến đường                   | `id: number`                                       | `void`                     |
| `getWayPoints(id)`            | Lấy danh sách điểm dừng của tuyến | `id: number`                                       | `Waypoint[] \| undefined`  |

**Đặc điểm:**

- Sử dụng defensive copy khi trả về danh sách (`[...this.routes]`) để tránh mutation từ bên ngoài
- Validate ID trước khi thêm, sửa, xóa
- Ném exception với thông báo rõ ràng khi có lỗi

#### 3.2. Manager Component - Tab Tuyến đường (Presentation Layer)

Component React quản lý giao diện người dùng cho module tuyến đường, nằm trong tab "Tuyến đường" của component `Manager`.

**Các tính năng UI:**

- Tab "Tuyến đường": Hiển thị và quản lý các tuyến đường
- Dialog tạo tuyến đường mới
- Dialog chỉnh sửa tuyến đường
- Grid hiển thị danh sách tuyến đường (responsive: 2 cột trên desktop, 1 cột trên mobile)
- Xác nhận xóa tuyến đường (AlertDialog)

**Các state quản lý:**

- `routeList`: Danh sách tuyến đường hiện tại
- `routeName`, `routeStops`, `routeDistance`, `routeAvgTime`, `routeBuses`: Form data cho tạo/chỉnh sửa
- `editingRouteId`: ID tuyến đường đang chỉnh sửa
- `isRouteDialogOpen`, `isEditRouteDialogOpen`: Trạng thái mở/đóng dialog
- `routeError`: Thông báo lỗi

### 4. Cấu trúc dữ liệu

#### 4.1. RouteRecord

Định nghĩa cấu trúc dữ liệu cho một tuyến đường:

```typescript
type RouteRecord = {
  id: number; // ID duy nhất của tuyến đường
  name: string; // Tên tuyến đường (ví dụ: "Tuyến E - Quận 4")
  stops: number; // Số lượng điểm dừng
  distance: string; // Khoảng cách (ví dụ: "18.5 km")
  avgTime: string; // Thời gian trung bình (ví dụ: "45 min")
  buses: number; // Số lượng xe buýt được phân công
  wayPoints?: Waypoint[]; // Danh sách điểm dừng (tùy chọn)
};
```

**Lưu ý:**

- `distance` và `avgTime` được lưu dưới dạng string với đơn vị để hiển thị trực quan
- Hệ thống tự động chuẩn hóa định dạng khi tạo/cập nhật (thêm "km" và "min" nếu chưa có)
- Khi chỉnh sửa, hệ thống trích xuất số từ string để hiển thị trong form input

#### 4.2. Waypoint

Định nghĩa điểm dừng trên tuyến đường:

```typescript
type Waypoint = {
  id: number; // ID điểm dừng
  name: string; // Tên điểm dừng
  lat: number; // Vĩ độ
  lng: number; // Kinh độ
};
```

### 5. Các chức năng chính

#### 5.1. Tạo tuyến đường mới

**Luồng xử lý:**

1. Người dùng nhấn nút "Tạo tuyến đường"
2. Dialog hiển thị form với các trường:
   - Tên tuyến đường (text input)
   - Số lượng điểm dừng (number input)
   - Khoảng cách (text input, có thể nhập số hoặc số + "km")
   - Thời gian trung bình (text input, có thể nhập số hoặc số + "min")
   - Số xe phân công (number input)
3. Validate dữ liệu: Kiểm tra tên tuyến đường không được trống
4. Chuẩn hóa dữ liệu:
   - Khoảng cách: Thêm "km" nếu chưa có, mặc định "0 km" nếu trống
   - Thời gian: Thêm "min" nếu chưa có, mặc định "0 min" nếu trống
5. Tạo `RouteRecord` mới với:
   - `id`: Timestamp hiện tại (`Date.now()`)
   - Các thông tin từ form đã được chuẩn hóa
6. Gọi `routesController.addRoute()` để thêm vào danh sách
7. Cập nhật UI với danh sách tuyến đường mới

**Xử lý lỗi:**

- Nếu tên tuyến đường trống: Hiển thị lỗi "Vui lòng nhập tên tuyến đường"
- Nếu ID đã tồn tại: Ném exception từ controller và hiển thị lỗi

#### 5.2. Chỉnh sửa tuyến đường

**Luồng xử lý:**

1. Người dùng nhấn nút "Chỉnh sửa" trên một tuyến đường trong grid
2. Hệ thống trích xuất số từ các trường:
   - Khoảng cách: Tách số từ string (ví dụ: "18.5 km" -> "18.5")
   - Thời gian: Tách số từ string (ví dụ: "45 min" -> "45")
3. Dialog chỉnh sửa hiển thị với dữ liệu hiện tại đã được điền sẵn
4. Người dùng chỉnh sửa thông tin
5. Validate và chuẩn hóa dữ liệu (tương tự như tạo mới)
6. Gọi `routesController.editRoute()` để cập nhật
7. Cập nhật UI

**Xử lý lỗi:**

- Nếu không tìm thấy tuyến đường: Hiển thị "Không tìm thấy tuyến đường cần chỉnh sửa"
- Nếu tên tuyến đường trống: Hiển thị lỗi validation

#### 5.3. Xóa tuyến đường

**Luồng xử lý:**

1. Người dùng nhấn nút "Xóa" trong dialog chỉnh sửa
2. AlertDialog hiển thị xác nhận xóa
3. Nếu xác nhận, gọi `routesController.removeRoute()`
4. Cập nhật UI và đóng dialog

**Xử lý lỗi:**

- Nếu không tìm thấy tuyến đường: Ném exception từ controller

**Lưu ý:**

- Hiện tại hệ thống chưa kiểm tra xem tuyến đường có đang được sử dụng trong phân công hay không trước khi xóa. Đây là một điểm cần cải thiện trong tương lai.

#### 5.4. Hiển thị danh sách tuyến đường

**Luồng xử lý:**

1. Component khởi tạo với dữ liệu từ `routesController.getRoutes()`
2. Hiển thị grid với các card tuyến đường, mỗi card chứa:
   - Tên tuyến đường
   - Số điểm dừng
   - Khoảng cách
   - Thời gian trung bình
   - Số xe phân công
   - Nút chỉnh sửa
3. Grid responsive:
   - 2 cột trên màn hình md trở lên (`md:grid-cols-2`)
   - 1 cột trên màn hình mobile

#### 5.5. Lấy điểm dừng (Waypoints)

**Luồng xử lý:**

1. Gọi `routesController.getWayPoints(id)` với ID tuyến đường
2. Trả về danh sách `Waypoint[]` hoặc `undefined` nếu không tìm thấy tuyến đường

**Lưu ý:**

- Tính năng này hiện tại chưa được sử dụng trong UI nhưng đã được implement trong controller để hỗ trợ tích hợp với module bản đồ trong tương lai.

### 6. Phụ thuộc và tích hợp

#### 6.1. Phụ thuộc vào các module khác

Module này là module độc lập, không phụ thuộc trực tiếp vào các module khác. Tuy nhiên:

- **Module Quản lý phân công** (`AssignController`): Sử dụng module này để lấy thông tin tuyến đường khi tạo phân công
- **Module Bản đồ** (tương lai): Có thể sử dụng `wayPoints` để hiển thị tuyến đường trên bản đồ

#### 6.2. Tích hợp với UI Components

Sử dụng các component từ thư viện UI:

- `Card`, `CardContent`, `CardHeader`, `CardTitle`, `CardDescription`
- `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`
- `AlertDialog` cho xác nhận xóa
- `Input`, `Label`, `Button`, `Tabs`, `TabsContent`, `TabsList`, `TabsTrigger`

#### 6.3. Model Integration

Module sử dụng dữ liệu mặc định từ:

- `Bus-Smart-app/app/models/ModelRoutes.ts`: Chứa danh sách tuyến đường mặc định

### 7. Xử lý lỗi và validation

#### 7.1. Validation phía client

- **Tạo tuyến đường:**

  - Kiểm tra tên tuyến đường không được trống
  - Số điểm dừng phải là số hợp lệ (>= 0, mặc định 0)
  - Số xe phân công phải là số hợp lệ (>= 0, mặc định 0)
  - Khoảng cách và thời gian được chuẩn hóa tự động

- **Chỉnh sửa tuyến đường:**
  - Tương tự như tạo tuyến đường
  - Kiểm tra tuyến đường tồn tại trước khi chỉnh sửa

#### 7.2. Xử lý lỗi từ Controller

- `addRoute()`: Ném lỗi `"Route with id {id} already exists"` nếu ID đã tồn tại
- `editRoute()`: Ném lỗi `"Route with id {id} does not exist"` nếu tuyến đường không tồn tại
- `removeRoute()`: Ném lỗi `"Route with id {id} does not exist"` nếu tuyến đường không tồn tại

Tất cả lỗi được bắt và hiển thị trong UI thông qua state `routeError`.

#### 7.3. Chuẩn hóa dữ liệu

**Khoảng cách:**

- Nếu input trống: Mặc định "0 km"
- Nếu input đã có "km": Giữ nguyên
- Nếu input chỉ có số: Thêm "km"

**Thời gian:**

- Nếu input trống: Mặc định "0 min"
- Nếu input đã có "min": Giữ nguyên
- Nếu input chỉ có số: Thêm "min"

**Trích xuất dữ liệu khi chỉnh sửa:**

- Khoảng cách: Sử dụng regex `/[\d.]+/` để trích xuất số
- Thời gian: Sử dụng regex `/[\d.]+/` để trích xuất số

### 8. Trạng thái và quản lý state

Component sử dụng React hooks để quản lý state:

- `routeList`: Danh sách tuyến đường hiện tại (được cập nhật sau mỗi thao tác CRUD)
- `routeName`: Tên tuyến đường trong form
- `routeStops`: Số điểm dừng trong form
- `routeDistance`: Khoảng cách trong form (chỉ số, không có đơn vị)
- `routeAvgTime`: Thời gian trung bình trong form (chỉ số, không có đơn vị)
- `routeBuses`: Số xe phân công trong form
- `editingRouteId`: ID tuyến đường đang chỉnh sửa (null nếu không có)
- `isRouteDialogOpen`: Trạng thái mở/đóng dialog tạo tuyến đường
- `isEditRouteDialogOpen`: Trạng thái mở/đóng dialog chỉnh sửa tuyến đường
- `routeError`: Thông báo lỗi (null nếu không có lỗi)

**Quản lý lifecycle:**

- `useEffect` để reset error và editingRouteId khi dialog đóng
- Controller được khởi tạo bằng `useRef` để tránh re-initialize mỗi lần render

### 9. Mở rộng trong tương lai

Các tính năng có thể mở rộng:

- **Quản lý điểm dừng chi tiết:**

  - UI để thêm/sửa/xóa waypoints cho mỗi tuyến đường
  - Hiển thị tuyến đường trên bản đồ với các điểm dừng
  - Tích hợp với Google Maps API

- **Tìm kiếm và lọc:**

  - Tìm kiếm tuyến đường theo tên
  - Lọc tuyến đường theo khoảng cách, số điểm dừng
  - Sắp xếp tuyến đường theo các tiêu chí

- **Validation nâng cao:**

  - Kiểm tra tuyến đường có đang được sử dụng trong phân công trước khi xóa
  - Validate khoảng cách và thời gian hợp lý
  - Kiểm tra trùng tên tuyến đường

- **Báo cáo và thống kê:**

  - Thống kê số lượng tuyến đường
  - Báo cáo tuyến đường được sử dụng nhiều nhất
  - Xuất danh sách tuyến đường ra file

- **Tích hợp với GPS:**

  - Theo dõi vị trí xe buýt trên tuyến đường
  - Cảnh báo khi xe lệch tuyến
  - Tính toán thời gian đến điểm dừng tiếp theo

- **Lịch trình tuyến đường:**
  - Quản lý lịch trình hoạt động của từng tuyến đường
  - Thời gian bắt đầu và kết thúc mỗi chuyến
  - Tần suất chạy xe trong ngày

## Module Quản lý tài xế

## Module Quản lý học sinh

## Module Theo dõi xe và Cập nhật danh sách điểm dừng theo thời gian thực
