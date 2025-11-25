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

### 1. Tổng quan

Module Quản lý tài xế là một module quan trọng trong hệ thống Bus Smart, chịu trách nhiệm quản lý thông tin tài xế, bao gồm thông tin cá nhân, bằng lái, liên hệ, xe và tuyến đường được phân công, trạng thái làm việc, kinh nghiệm và đánh giá. Module này cung cấp giao diện quản lý trực quan cho quản trị viên để thực hiện các thao tác CRUD (Create, Read, Update, Delete) đầy đủ trên dữ liệu tài xế.

**Vị trí trong hệ thống:**

- Controller: `Bus-Smart-app/app/controllers/Drivers.ts`
- UI Component: `Bus-Smart-app/app/components/app/pages/Drivers.tsx`
- Model: `Bus-Smart-app/app/models/ModelDrivers.ts`

### Đặc tả Use case (Use case description)

#### Use Case 1: Tạo tài xế mới (Create Driver)

| Trường                   | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Use case name**        | Tạo tài xế mới                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Scenario**             | Quản trị viên tạo tài xế mới trong hệ thống                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| **Triggering event**     | Quản trị viên nhấn nút "Thêm tài xế" trên giao diện quản lý tài xế                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **Brief description**    | Quản trị viên tạo một tài xế mới bằng cách nhập thông tin cá nhân (tên, số bằng lái, số điện thoại, email), thông tin phân công (xe phụ trách, tuyến đường), trạng thái, kinh nghiệm và đánh giá. Hệ thống sẽ tạo và lưu tài xế mới vào danh sách.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **Actors**               | Quản trị viên (Manager)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| **Related use cases**    | Có thể được gọi từ Module Quản lý phân công khi cần thêm tài xế mới để phân công                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **Stakeholders**         | Quản trị viên, Tài xế, Học sinh, Phụ huynh                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| **Preconditions**        | <ul><li>Module DriverController phải sẵn sàng hoạt động</li><li>Component Drivers phải được khởi tạo</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Postconditions**       | <ul><li>Tài xế mới phải được tạo và lưu vào danh sách</li><li>Tài xế phải có ID duy nhất (timestamp)</li><li>Thông tin tài xế phải được lưu đầy đủ</li><li>Danh sách tài xế trên giao diện phải được cập nhật</li><li>Thống kê tổng quan (tổng tài xế, đang thực hiện, chưa phân công, đánh giá trung bình) phải được cập nhật</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **Flow of activities**   | <table><tr><th>Actor</th><th>System</th></tr><tr><td>1. Quản trị viên nhấn nút "Thêm tài xế"</td><td>1.1 Hệ thống hiển thị dialog form tạo tài xế<br>1.2 Hệ thống reset form về trạng thái ban đầu</td></tr><tr><td>2. Quản trị viên nhập họ và tên</td><td>2.1 Hệ thống lưu giá trị vào form state</td></tr><tr><td>3. Quản trị viên nhập số bằng lái</td><td>3.1 Hệ thống lưu giá trị vào form state</td></tr><tr><td>4. Quản trị viên nhập số điện thoại</td><td>4.1 Hệ thống lưu giá trị vào form state</td></tr><tr><td>5. Quản trị viên nhập email (tùy chọn)</td><td>5.1 Hệ thống lưu giá trị vào form state</td></tr><tr><td>6. Quản trị viên nhập xe phụ trách (tùy chọn)</td><td>6.1 Hệ thống lưu giá trị vào form state</td></tr><tr><td>7. Quản trị viên nhập tuyến đường (tùy chọn)</td><td>7.1 Hệ thống lưu giá trị vào form state</td></tr><tr><td>8. Quản trị viên chọn trạng thái (đang thực hiện, chưa phân công)</td><td>8.1 Hệ thống lưu trạng thái đã chọn (mặc định "đang thực hiện")</td></tr><tr><td>9. Quản trị viên nhập kinh nghiệm (tùy chọn)</td><td>9.1 Hệ thống lưu giá trị vào form state</td></tr><tr><td>10. Quản trị viên nhập đánh giá 0-5 (tùy chọn)</td><td>10.1 Hệ thống lưu giá trị vào form state</td></tr><tr><td>11. Quản trị viên nhấn nút "Lưu tài xế"</td><td>11.1 Hệ thống validate dữ liệu (kiểm tra tên, số bằng lái, số điện thoại không được trống)<br>11.2 Hệ thống validate đánh giá (nếu có, phải từ 0 đến 5)<br>11.3 Hệ thống chuẩn hóa dữ liệu (trim whitespace, mặc định "Chưa cập nhật" cho bus/route/experience nếu trống, mặc định 0 cho rating nếu trống)<br>11.4 Hệ thống tạo DriverRecord mới với ID = Date.now()<br>11.5 Hệ thống gọi driverController.addDriver()<br>11.6 Hệ thống cập nhật danh sách tài xế trên giao diện<br>11.7 Hệ thống cập nhật thống kê tổng quan<br>11.8 Hệ thống đóng dialog và reset form</td></tr></table> |
| **Exception conditions** | <ul><li>11.1 Nếu thiếu thông tin bắt buộc (tên, số bằng lái, số điện thoại): Hiển thị lỗi "Vui lòng nhập đầy đủ tên, số bằng lái và số điện thoại"</li><li>11.2 Nếu đánh giá không hợp lệ (không phải số hoặc ngoài khoảng 0-5): Hiển thị lỗi "Đánh giá phải là số từ 0 đến 5"</li><li>11.5 Nếu ID tài xế đã tồn tại: Ném exception "Driver with id {id} already exists" và hiển thị lỗi</li><li>11.5 Nếu có lỗi trong quá trình thêm: Hiển thị thông báo lỗi "Không thể thêm tài xế"</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |

#### Use Case 2: Chỉnh sửa tài xế (Edit Driver)

| Trường                   | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Use case name**        | Chỉnh sửa tài xế                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **Scenario**             | Quản trị viên chỉnh sửa thông tin của một tài xế hiện có                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Triggering event**     | Quản trị viên nhấn nút "Chỉnh sửa" trên một tài xế trong grid danh sách                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **Brief description**    | Quản trị viên chỉnh sửa thông tin tài xế bằng cách cập nhật các trường thông tin. Hệ thống sẽ cập nhật và lưu thay đổi.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **Actors**               | Quản trị viên (Manager)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **Related use cases**    | Có thể được gọi sau khi xem danh sách tài xế                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Stakeholders**         | Quản trị viên, Tài xế, Học sinh, Phụ huynh                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Preconditions**        | <ul><li>Tài xế cần chỉnh sửa phải tồn tại trong hệ thống</li><li>Module DriverController phải sẵn sàng hoạt động</li><li>Component Drivers phải được khởi tạo</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **Postconditions**       | <ul><li>Tài xế phải được cập nhật với thông tin mới</li><li>ID tài xế không được thay đổi</li><li>Danh sách tài xế trên giao diện phải được cập nhật</li><li>Thống kê tổng quan phải được cập nhật nếu có thay đổi về trạng thái hoặc đánh giá</li><li>Dialog chỉnh sửa phải được đóng</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **Flow of activities**   | <table><tr><th>Actor</th><th>System</th></tr><tr><td>1. Quản trị viên nhấn nút "Chỉnh sửa" trên một tài xế</td><td>1.1 Hệ thống lấy thông tin tài xế theo ID<br>1.2 Hệ thống điền sẵn form với dữ liệu hiện tại (chuyển rating sang string để hiển thị)<br>1.3 Hệ thống mở dialog chỉnh sửa<br>1.4 Hệ thống lưu ID tài xế vào editingDriverId</td></tr><tr><td>2. Quản trị viên chỉnh sửa thông tin (tên, số bằng lái, số điện thoại, email, xe, tuyến đường, trạng thái, kinh nghiệm, đánh giá)</td><td>2.1 Hệ thống cập nhật form data theo thay đổi của người dùng<br>2.2 Hệ thống reset formError nếu có</td></tr><tr><td>3. Quản trị viên nhấn nút "Cập nhật"</td><td>3.1 Hệ thống validate dữ liệu (kiểm tra tên, số bằng lái, số điện thoại không được trống)<br>3.2 Hệ thống validate đánh giá (nếu có, phải từ 0 đến 5)<br>3.3 Hệ thống kiểm tra tài xế có tồn tại không<br>3.4 Hệ thống chuẩn hóa dữ liệu (tương tự như tạo mới)<br>3.5 Hệ thống gọi driverController.editDriver()<br>3.6 Hệ thống cập nhật danh sách tài xế trên giao diện<br>3.7 Hệ thống cập nhật thống kê tổng quan<br>3.8 Hệ thống đóng dialog và reset form</td></tr></table> |
| **Exception conditions** | <ul><li>3.1 Nếu thiếu thông tin bắt buộc: Hiển thị lỗi "Vui lòng nhập đầy đủ tên, số bằng lái và số điện thoại"</li><li>3.2 Nếu đánh giá không hợp lệ: Hiển thị lỗi "Đánh giá phải là số từ 0 đến 5"</li><li>3.3 Nếu tài xế không tồn tại: Hiển thị lỗi "Không tìm thấy tài xế cần chỉnh sửa"</li><li>3.5 Nếu tài xế không tồn tại: Ném exception "Driver with id {id} does not exist"</li><li>3.5 Nếu có lỗi trong quá trình cập nhật: Hiển thị thông báo lỗi "Không thể cập nhật tài xế"</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |

#### Use Case 3: Xóa tài xế (Delete Driver)

| Trường                   | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Use case name**        | Xóa tài xế                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **Scenario**             | Quản trị viên xóa một tài xế khỏi hệ thống                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **Triggering event**     | Quản trị viên nhấn nút "Xóa" trong dialog chỉnh sửa tài xế                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **Brief description**    | Quản trị viên xác nhận xóa một tài xế. Hệ thống sẽ xóa tài xế khỏi danh sách và cập nhật giao diện.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **Actors**               | Quản trị viên (Manager)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **Related use cases**    | Thường được gọi sau khi chỉnh sửa tài xế (trong cùng dialog)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| **Stakeholders**         | Quản trị viên, Tài xế, Học sinh, Phụ huynh                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **Preconditions**        | <ul><li>Tài xế cần xóa phải tồn tại trong hệ thống</li><li>Dialog chỉnh sửa phải đang mở</li><li>Module DriverController phải sẵn sàng hoạt động</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **Postconditions**       | <ul><li>Tài xế phải được xóa khỏi danh sách</li><li>Danh sách tài xế trên giao diện phải được cập nhật</li><li>Thống kê tổng quan phải được cập nhật</li><li>Dialog chỉnh sửa phải được đóng</li><li>Form phải được reset</li><li>editingDriverId phải được xóa (set về null)</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **Flow of activities**   | <table><tr><th>Actor</th><th>System</th></tr><tr><td>1. Quản trị viên nhấn nút "Xóa" trong dialog chỉnh sửa</td><td>1.1 Hệ thống hiển thị AlertDialog xác nhận xóa</td></tr><tr><td>2. Quản trị viên xem thông báo xác nhận</td><td>2.1 Hệ thống hiển thị thông báo "Bạn có chắc chắn muốn xóa tài xế này? Hành động này không thể hoàn tác."</td></tr><tr><td>3. Quản trị viên nhấn nút "Xóa" để xác nhận</td><td>3.1 Hệ thống gọi driverController.removeDriver() với ID tài xế<br>3.2 Hệ thống xóa tài xế khỏi danh sách<br>3.3 Hệ thống cập nhật danh sách tài xế trên giao diện<br>3.4 Hệ thống cập nhật thống kê tổng quan<br>3.5 Hệ thống đóng AlertDialog và dialog chỉnh sửa<br>3.6 Hệ thống reset form và xóa editingDriverId</td></tr><tr><td>4. (Alternative) Quản trị viên nhấn "Hủy"</td><td>4.1 Hệ thống đóng AlertDialog, giữ nguyên dialog chỉnh sửa</td></tr></table> |
| **Exception conditions** | <ul><li>3.1 Nếu tài xế không tồn tại: Ném exception "Driver with id {id} does not exist" và hiển thị lỗi "Không thể xóa tài xế"</li><li>3.2 Nếu có lỗi trong quá trình xóa: Hiển thị thông báo lỗi và không xóa tài xế</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |

#### Use Case 4: Xem danh sách tài xế (View Drivers)

| Trường                   | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Use case name**        | Xem danh sách tài xế                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Scenario**             | Quản trị viên xem danh sách tất cả các tài xế hiện có trong hệ thống                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Triggering event**     | Quản trị viên truy cập trang Quản lý tài xế                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **Brief description**    | Quản trị viên xem danh sách tất cả các tài xế được hiển thị dưới dạng grid với các card tài xế, mỗi card chứa thông tin chi tiết về tài xế, trạng thái, tuyến đường, xe phụ trách, kinh nghiệm, đánh giá và các nút liên hệ. Hệ thống cũng hiển thị thống kê tổng quan ở đầu trang.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **Actors**               | Quản trị viên (Manager)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **Related use cases**    | Được gọi trước khi thực hiện chỉnh sửa hoặc xóa tài xế                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| **Stakeholders**         | Quản trị viên, Tài xế, Học sinh, Phụ huynh                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| **Preconditions**        | <ul><li>Module DriverController phải sẵn sàng hoạt động</li><li>Component Drivers phải được khởi tạo</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **Postconditions**       | <ul><li>Danh sách tài xế phải được hiển thị trên giao diện</li><li>Thống kê tổng quan phải được hiển thị (tổng tài xế, đang thực hiện, chưa phân công, đánh giá trung bình)</li><li>Mỗi tài xế phải hiển thị đầy đủ thông tin: avatar, tên, số bằng lái, trạng thái, tuyến đường, xe phụ trách, kinh nghiệm, đánh giá</li><li>Trạng thái phải được hiển thị với Badge màu sắc phù hợp (xanh cho "đang thực hiện", xám cho "chưa phân công")</li><li>Mỗi tài xế phải có nút "Chỉnh sửa" để chỉnh sửa</li><li>Mỗi tài xế phải có nút "Gọi" và "Email" để liên hệ</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **Flow of activities**   | <table><tr><th>Actor</th><th>System</th></tr><tr><td>1. Quản trị viên truy cập trang Quản lý tài xế</td><td>1.1 Hệ thống khởi tạo DriverController bằng useRef<br>1.2 Hệ thống gọi driverController.getDrivers() để lấy danh sách tài xế<br>1.3 Hệ thống lưu danh sách vào state driverList</td></tr><tr><td>2. Hệ thống tính toán thống kê</td><td>2.1 Hệ thống tính tổng số tài xế (driverList.length)<br>2.2 Hệ thống tính số tài xế đang thực hiện (filter status === "đang thực hiện")<br>2.3 Hệ thống tính số tài xế chưa phân công (tổng - đang thực hiện)<br>2.4 Hệ thống tính đánh giá trung bình (tổng rating / số lượng, làm tròn 1 chữ số)</td></tr><tr><td>3. Quản trị viên xem danh sách tài xế</td><td>3.1 Hệ thống hiển thị 4 thẻ thống kê ở đầu trang<br>3.2 Hệ thống hiển thị grid với các card tài xế (responsive: 3 cột desktop, 2 cột tablet, 1 cột mobile)<br>3.3 Mỗi card hiển thị:<br>- Avatar với chữ cái đầu của tên<br>- Tên và số bằng lái<br>- Badge trạng thái với màu sắc<br>- Tuyến đường phụ trách<br>- Xe phụ trách<br>- Kinh nghiệm<br>- Đánh giá (rating với 1 chữ số thập phân)<br>- Nút "Gọi" và "Email"<br>- Nút "Chỉnh sửa"</td></tr></table> |
| **Exception conditions** | <ul><li>1.2 Nếu không có tài xế nào: Hiển thị grid trống</li><li>1.2 Nếu có lỗi khi tải dữ liệu: Hiển thị thông báo lỗi</li><li>2.4 Nếu tổng số tài xế = 0: Đánh giá trung bình hiển thị "0.0"</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

### 2. Mục đích

Module này được thiết kế để:

- Quản lý thông tin cá nhân của tài xế (tên, số bằng lái, số điện thoại, email)
- Theo dõi xe buýt và tuyến đường được phân công cho từng tài xế
- Quản lý trạng thái làm việc của tài xế (đang thực hiện, chưa phân công)
- Lưu trữ và hiển thị kinh nghiệm làm việc và đánh giá của tài xế
- Cung cấp giao diện quản lý trực quan với thống kê tổng quan
- Hỗ trợ các thao tác CRUD (Create, Read, Update, Delete) đầy đủ
- Cung cấp các nút liên hệ nhanh (gọi điện, email) cho từng tài xế

### 3. Kiến trúc và thành phần

#### 3.1. DriverController (Controller Layer)

`DriverController` (class `Driver`) là lớp điều khiển chính, quản lý logic nghiệp vụ và dữ liệu tài xế.

**Các thành phần:**

- `drivers: DriverRecord[]` - Danh sách các tài xế (private)
- Constructor nhận `initialDrivers` (mặc định là `defaultDrivers` từ model)

**Các phương thức chính:**

| Phương thức                     | Mô tả                       | Tham số                                              | Giá trị trả về              |
| ------------------------------- | --------------------------- | ---------------------------------------------------- | --------------------------- |
| `getDrivers()`                  | Lấy danh sách tất cả tài xế | -                                                    | `DriverRecord[]`            |
| `getDriverbyId(id)`             | Lấy tài xế theo ID          | `id: number`                                         | `DriverRecord \| undefined` |
| `addDriver(driver)`             | Thêm tài xế mới             | `driver: DriverRecord`                               | `DriverRecord`              |
| `editDriver(id, updatedDriver)` | Cập nhật tài xế             | `id: number`, `updatedDriver: Partial<DriverRecord>` | `DriverRecord`              |
| `removeDriver(id)`              | Xóa tài xế                  | `id: number`                                         | `void`                      |

**Đặc điểm:**

- Sử dụng defensive copy khi trả về danh sách (`[...this.drivers]`) để tránh mutation từ bên ngoài
- Validate ID trước khi thêm, sửa, xóa
- Ném exception với thông báo rõ ràng khi có lỗi
- Đảm bảo ID không bị thay đổi khi chỉnh sửa

#### 3.2. Drivers Component (Presentation Layer)

Component React quản lý giao diện người dùng cho module quản lý tài xế.

**Các tính năng UI:**

- **Thống kê tổng quan:** Hiển thị 4 thẻ thống kê:
  - Tổng tài xế
  - Đang thực hiện
  - Chưa phân công
  - Đánh giá trung bình
- **Grid hiển thị tài xế:** Responsive grid (3 cột trên desktop, 2 cột trên tablet, 1 cột trên mobile)
- **Card tài xế:** Mỗi card hiển thị:
  - Avatar với chữ cái đầu của tên
  - Tên và số bằng lái
  - Badge trạng thái (màu xanh cho "đang thực hiện", màu xám cho "chưa phân công")
  - Tuyến đường phụ trách
  - Xe phụ trách
  - Kinh nghiệm
  - Đánh giá (rating)
  - Nút liên hệ (Gọi, Email)
  - Nút chỉnh sửa
- **Dialog tạo tài xế mới:** Form với các trường:
  - Họ và tên
  - Số bằng lái
  - Số điện thoại
  - Email
  - Xe phụ trách
  - Tuyến đường
  - Trạng thái (dropdown)
  - Kinh nghiệm
  - Đánh giá (0-5)
- **Dialog chỉnh sửa tài xế:** Tương tự dialog tạo mới, có thêm nút xóa
- **Xác nhận xóa:** AlertDialog để xác nhận trước khi xóa

**Các state quản lý:**

- `driverList`: Danh sách tài xế hiện tại
- `form`: Form data cho tạo/chỉnh sửa (DriverFormState)
- `editingDriverId`: ID tài xế đang chỉnh sửa (null nếu không có)
- `isDialogOpen`: Trạng thái mở/đóng dialog tạo tài xế
- `isEditDialogOpen`: Trạng thái mở/đóng dialog chỉnh sửa tài xế
- `formError`: Thông báo lỗi (null nếu không có lỗi)

### 4. Cấu trúc dữ liệu

#### 4.1. DriverRecord

Định nghĩa cấu trúc dữ liệu cho một tài xế:

```typescript
type DriverRecord = {
  id: number; // ID duy nhất của tài xế
  name: string; // Họ và tên tài xế
  license: string; // Số bằng lái (ví dụ: "DL-12345")
  phone: string; // Số điện thoại (ví dụ: "+84 919 832 446")
  email: string; // Email liên hệ
  bus: string; // Xe buýt được phân công (ví dụ: "Xe số 12")
  route: string; // Tuyến đường phụ trách (ví dụ: "Tuyến A - Quận 1")
  status: string; // Trạng thái: "đang thực hiện" hoặc "chưa phân công"
  experience: string; // Kinh nghiệm (ví dụ: "8 năm")
  rating: number; // Đánh giá từ 0 đến 5 (ví dụ: 4.8)
};
```

**Lưu ý:**

- `bus` và `route` có thể là "Chưa cập nhật" nếu chưa được phân công
- `experience` có thể là "Chưa cập nhật" nếu chưa có thông tin
- `rating` là số thập phân từ 0 đến 5, được làm tròn 1 chữ số thập phân
- `status` chỉ có 2 giá trị: "đang thực hiện" hoặc "chưa phân công"

#### 4.2. DriverFormState

Định nghĩa cấu trúc dữ liệu cho form tạo/chỉnh sửa tài xế:

```typescript
type DriverFormState = {
  name: string;
  license: string;
  phone: string;
  email: string;
  bus: string;
  route: string;
  status: DriverRecord["status"];
  experience: string;
  rating: string; // Lưu dưới dạng string trong form để dễ xử lý
};
```

**Lưu ý:**

- `rating` được lưu dưới dạng string trong form để dễ validate và chuyển đổi
- Khi submit, `rating` được chuyển đổi sang number và làm tròn 1 chữ số thập phân

### 5. Các chức năng chính

#### 5.1. Tạo tài xế mới

**Luồng xử lý:**

1. Người dùng nhấn nút "Thêm tài xế"
2. Dialog hiển thị form với các trường:
   - Họ và tên (text input, bắt buộc)
   - Số bằng lái (text input, bắt buộc)
   - Số điện thoại (text input, bắt buộc)
   - Email (email input, tùy chọn)
   - Xe phụ trách (text input, tùy chọn)
   - Tuyến đường (text input, tùy chọn)
   - Trạng thái (select dropdown, mặc định "đang thực hiện")
   - Kinh nghiệm (text input, tùy chọn)
   - Đánh giá (number input, 0-5, tùy chọn)
3. Validate dữ liệu:
   - Kiểm tra tên, số bằng lái, số điện thoại không được trống
   - Kiểm tra đánh giá phải là số từ 0 đến 5 (nếu có)
4. Tạo `DriverRecord` mới với:
   - `id`: Timestamp hiện tại (`Date.now()`)
   - Các thông tin từ form đã được chuẩn hóa:
     - `bus` và `route`: Mặc định "Chưa cập nhật" nếu trống
     - `experience`: Mặc định "Chưa cập nhật" nếu trống
     - `rating`: Mặc định 0 nếu trống, làm tròn 1 chữ số thập phân
5. Gọi `driverController.addDriver()` để thêm vào danh sách
6. Cập nhật UI với danh sách tài xế mới
7. Đóng dialog và reset form

**Xử lý lỗi:**

- Nếu thiếu thông tin bắt buộc: Hiển thị lỗi "Vui lòng nhập đầy đủ tên, số bằng lái và số điện thoại"
- Nếu đánh giá không hợp lệ: Hiển thị lỗi "Đánh giá phải là số từ 0 đến 5"
- Nếu ID đã tồn tại: Ném exception từ controller và hiển thị lỗi

#### 5.2. Chỉnh sửa tài xế

**Luồng xử lý:**

1. Người dùng nhấn nút "Chỉnh sửa" trên một tài xế trong grid
2. Hệ thống lấy thông tin tài xế theo ID
3. Dialog chỉnh sửa hiển thị với dữ liệu hiện tại đã được điền sẵn:
   - `rating` được chuyển sang string để hiển thị trong input
4. Người dùng chỉnh sửa thông tin
5. Validate dữ liệu (tương tự như tạo mới)
6. Kiểm tra tài xế có tồn tại không
7. Gọi `driverController.editDriver()` để cập nhật
8. Cập nhật UI

**Xử lý lỗi:**

- Nếu không tìm thấy tài xế: Hiển thị "Không tìm thấy tài xế cần chỉnh sửa"
- Nếu thiếu thông tin bắt buộc: Hiển thị lỗi validation
- Nếu đánh giá không hợp lệ: Hiển thị lỗi validation

#### 5.3. Xóa tài xế

**Luồng xử lý:**

1. Người dùng nhấn nút "Xóa" trong dialog chỉnh sửa
2. AlertDialog hiển thị xác nhận xóa với thông báo: "Bạn có chắc chắn muốn xóa tài xế này? Hành động này không thể hoàn tác."
3. Nếu xác nhận, gọi `driverController.removeDriver()` với ID tài xế
4. Cập nhật UI và đóng dialog
5. Reset form và xóa `editingDriverId`

**Xử lý lỗi:**

- Nếu không tìm thấy tài xế: Ném exception từ controller và hiển thị lỗi "Không thể xóa tài xế"

**Lưu ý:**

- Hiện tại hệ thống chưa kiểm tra xem tài xế có đang được sử dụng trong phân công hay không trước khi xóa. Đây là một điểm cần cải thiện trong tương lai.

#### 5.4. Hiển thị danh sách tài xế

**Luồng xử lý:**

1. Component khởi tạo với dữ liệu từ `driverController.getDrivers()`
2. Tính toán thống kê:
   - Tổng số tài xế
   - Số tài xế đang thực hiện (status === "đang thực hiện")
   - Số tài xế chưa phân công (tổng - đang thực hiện)
   - Đánh giá trung bình (tổng rating / số lượng, làm tròn 1 chữ số)
3. Hiển thị grid với các card tài xế, mỗi card chứa:
   - Avatar với chữ cái đầu của tên
   - Tên và số bằng lái
   - Badge trạng thái với màu sắc phù hợp
   - Thông tin tuyến đường, xe, kinh nghiệm, đánh giá
   - Nút liên hệ (Gọi, Email)
   - Nút chỉnh sửa
4. Grid responsive:
   - 3 cột trên màn hình lg trở lên (`lg:grid-cols-3`)
   - 2 cột trên màn hình md (`md:grid-cols-2`)
   - 1 cột trên màn hình mobile

#### 5.5. Liên hệ tài xế

**Luồng xử lý:**

1. Người dùng nhấn nút "Gọi" hoặc "Email" trên card tài xế
2. Nút "Gọi": Hiển thị số điện thoại (có thể tích hợp với `tel:` link trong tương lai)
3. Nút "Email": Hiển thị email (có thể tích hợp với `mailto:` link trong tương lai)

**Lưu ý:**

- Hiện tại các nút liên hệ chỉ hiển thị thông tin, chưa có chức năng thực sự. Có thể mở rộng để:
  - Gọi điện trực tiếp (với `tel:` link trên mobile)
  - Mở ứng dụng email (với `mailto:` link)

### 6. Phụ thuộc và tích hợp

#### 6.1. Phụ thuộc vào các module khác

Module này là module độc lập, không phụ thuộc trực tiếp vào các module khác. Tuy nhiên:

- **Module Quản lý phân công** (`AssignController`): Có thể sử dụng module này để lấy thông tin tài xế khi tạo phân công
- **Module Quản lý tuyến đường**: Có thể tích hợp để lấy danh sách tuyến đường khi phân công cho tài xế
- **Module Quản lý xe buýt**: Có thể tích hợp để lấy danh sách xe buýt khi phân công cho tài xế

#### 6.2. Tích hợp với UI Components

Sử dụng các component từ thư viện UI:

- `Card`, `CardContent`, `CardHeader`, `CardTitle`, `CardDescription`
- `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`, `DialogTrigger`
- `AlertDialog`, `AlertDialogAction`, `AlertDialogCancel`, `AlertDialogContent`, `AlertDialogDescription`, `AlertDialogFooter`, `AlertDialogHeader`, `AlertDialogTitle`, `AlertDialogTrigger`
- `Input`, `Label`, `Button`, `Badge`, `Avatar`, `AvatarFallback`
- `Select`, `SelectContent`, `SelectItem`, `SelectTrigger`, `SelectValue`
- Icons từ `lucide-react`: `Phone`, `Mail`, `MapPin`, `Clock`, `User`

#### 6.3. Model Integration

Module sử dụng dữ liệu mặc định từ:

- `Bus-Smart-app/app/models/ModelDrivers.ts`: Chứa danh sách tài xế mặc định

### 7. Xử lý lỗi và validation

#### 7.1. Validation phía client

- **Tạo tài xế:**

  - Kiểm tra tên không được trống
  - Kiểm tra số bằng lái không được trống
  - Kiểm tra số điện thoại không được trống
  - Kiểm tra đánh giá phải là số hợp lệ (>= 0 và <= 5) nếu có nhập
  - Email không bắt buộc nhưng nếu nhập phải đúng định dạng (validation tự động của input type="email")

- **Chỉnh sửa tài xế:**
  - Tương tự như tạo tài xế
  - Kiểm tra tài xế tồn tại trước khi chỉnh sửa

#### 7.2. Xử lý lỗi từ Controller

- `addDriver()`: Ném lỗi `"Driver with id {id} already exists"` nếu ID đã tồn tại
- `editDriver()`: Ném lỗi `"Driver with id {id} does not exist"` nếu tài xế không tồn tại
- `removeDriver()`: Ném lỗi `"Driver with id {id} does not exist"` nếu tài xế không tồn tại

Tất cả lỗi được bắt và hiển thị trong UI thông qua state `formError`.

#### 7.3. Chuẩn hóa dữ liệu

**Xe phụ trách và Tuyến đường:**

- Nếu input trống: Mặc định "Chưa cập nhật"
- Nếu input có giá trị: Trim whitespace và giữ nguyên

**Kinh nghiệm:**

- Nếu input trống: Mặc định "Chưa cập nhật"
- Nếu input có giá trị: Trim whitespace và giữ nguyên

**Đánh giá:**

- Nếu input trống: Mặc định 0
- Nếu input có giá trị: Chuyển đổi sang number và làm tròn 1 chữ số thập phân
- Validate: Phải là số từ 0 đến 5

**Tên, số bằng lái, số điện thoại:**

- Trim whitespace trước khi lưu
- Không được trống (validation bắt buộc)

### 8. Trạng thái và quản lý state

Component sử dụng React hooks để quản lý state:

- `driverList`: Danh sách tài xế hiện tại (được cập nhật sau mỗi thao tác CRUD)
- `form`: Form data cho tạo/chỉnh sửa (DriverFormState)
- `editingDriverId`: ID tài xế đang chỉnh sửa (null nếu không có)
- `isDialogOpen`: Trạng thái mở/đóng dialog tạo tài xế
- `isEditDialogOpen`: Trạng thái mở/đóng dialog chỉnh sửa tài xế
- `formError`: Thông báo lỗi (null nếu không có lỗi)

**Quản lý lifecycle:**

- Controller được khởi tạo bằng `useRef` để tránh re-initialize mỗi lần render
- `driverList` được khởi tạo từ `driverController.getDrivers()` khi component mount
- Form được reset khi dialog đóng thông qua `handleDialogChange` và `handleEditDialogChange`
- `formError` được reset khi:
  - Dialog đóng
  - Người dùng thay đổi giá trị trong form

**Các hàm xử lý:**

- `handleDialogChange`: Xử lý mở/đóng dialog tạo mới, reset form khi đóng
- `handleEditDialogChange`: Xử lý mở/đóng dialog chỉnh sửa, reset form và `editingDriverId` khi đóng
- `handleFormChange`: Cập nhật giá trị form và reset error khi người dùng nhập
- `resetForm`: Reset form về trạng thái ban đầu và xóa error
- `handleAddDriver`: Xử lý tạo tài xế mới
- `handleEditClick`: Khởi tạo form với dữ liệu tài xế cần chỉnh sửa
- `handleEditDriver`: Xử lý cập nhật tài xế
- `handleRemoveDriver`: Xử lý xóa tài xế

### 9. Mở rộng trong tương lai

Các tính năng có thể mở rộng:

- **Tìm kiếm và lọc:**

  - Tìm kiếm tài xế theo tên, số bằng lái, số điện thoại
  - Lọc tài xế theo trạng thái (đang thực hiện, chưa phân công)
  - Lọc tài xế theo tuyến đường hoặc xe buýt
  - Sắp xếp tài xế theo đánh giá, kinh nghiệm, tên

- **Validation nâng cao:**

  - Kiểm tra tài xế có đang được sử dụng trong phân công trước khi xóa
  - Validate số điện thoại theo định dạng Việt Nam
  - Validate số bằng lái theo định dạng chuẩn
  - Kiểm tra trùng số bằng lái (mỗi tài xế phải có số bằng lái duy nhất)
  - Kiểm tra trùng email (nếu email là bắt buộc)

- **Quản lý lịch trình:**

  - Xem lịch làm việc của từng tài xế
  - Phân công ca làm việc cho tài xế
  - Theo dõi giờ làm việc và nghỉ phép

- **Đánh giá và phản hồi:**

  - Cho phép phụ huynh đánh giá tài xế
  - Lưu lịch sử đánh giá theo thời gian
  - Hiển thị biểu đồ xu hướng đánh giá

- **Tích hợp liên hệ:**

  - Tích hợp `tel:` link để gọi điện trực tiếp trên mobile
  - Tích hợp `mailto:` link để mở ứng dụng email
  - Tích hợp SMS/WhatsApp để liên hệ nhanh

- **Xuất dữ liệu:**

  - Xuất danh sách tài xế ra file Excel/PDF
  - In danh sách tài xế
  - Xuất báo cáo thống kê tài xế

- **Quản lý bằng lái:**

  - Lưu trữ thông tin chi tiết về bằng lái (ngày cấp, ngày hết hạn)
  - Cảnh báo khi bằng lái sắp hết hạn
  - Quản lý lịch sử gia hạn bằng lái

- **Tích hợp với module khác:**
  - Tự động cập nhật xe và tuyến đường khi có phân công mới
  - Đồng bộ trạng thái tài xế với trạng thái phân công
  - Hiển thị lịch sử phân công của từng tài xế

## Module Quản lý học sinh

### 1. Tổng quan

### Đặc tả Use case (Use case description)

### 2. Mục đích

### 3. Kiến trúc và thành phần

### 4. Cấu trúc dữ liệu

### 5. Các chức năng chính

### 6. Phụ thuộc và tích hợp

### 7. Xử lý lỗi và validation

### 8. Trạng thái và quản lý state

### 9. Mở rộng trong tương lai

## Module Theo dõi xe và Cập nhật danh sách điểm dừng theo thời gian thực

### 1. Tổng quan

### Đặc tả Use case (Use case description)

### 2. Mục đích

### 3. Kiến trúc và thành phần

### 4. Cấu trúc dữ liệu

### 5. Các chức năng chính

### 6. Phụ thuộc và tích hợp

### 7. Xử lý lỗi và validation

### 8. Trạng thái và quản lý state

### 9. Mở rộng trong tương lai
