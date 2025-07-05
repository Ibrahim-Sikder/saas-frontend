import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import JobCardList from "../pages/Home/AddJobCard/JobCardList";
import AddEmployee from "../pages/Home/Employee/AddEmployee";
import ViewInvoice from "../pages/Home/Invoice/ViewInvoice";
import Detail from "../pages/Home/Invoice/Detail";
import UpdateInvoice from "../pages/Home/Invoice/UpdateInvoice";
import Invoice from "../pages/Home/Invoice/Invoice";
import AddRole from "../pages/Home/Role/AddRole";
import Role from "../pages/Home/Role/Role";
import UpdateCustomer from "../pages/Home/Customer/UpdateCustomer";
import AddExpense from "../pages/Home/Expense/AddExpense";
import AddCustomer from "../pages/Home/Customer/AddCustomer";
import AddProduct from "../pages/Home/Products/AddProduct";
import Profile from "../pages/Home/Profile/Profile";
import UpdateJobCard from "../pages/Home/AddJobCard/UpdateJobCard";
import AddJobCard from "../pages/Home/AddJobCard/AddJobCard";
import PreviewJobCard from "../pages/Home/AddJobCard/PreviewJobCard/PreviewJobCard";
import UpdateProduct from "../pages/Home/Products/UpdateProduct";
import UpdateRole from "../pages/Home/Role/UpdateRole";
import DashboardLayout from "../Layout/DashboardLayout";
import MoneyReceived from "../pages/Home/MoneyReceived/MoneyReceived";
import MoneyReceiptList from "../pages/Home/MoneyReceived/MoneyReceiptList";
import MoneyReceiptView from "../pages/Home/MoneyReceived/MoneyReceiptView";
import UpdateMoneyReceipt from "../pages/Home/MoneyReceived/UpdateMoneyReceipt";
import AddQuotation from "../pages/Home/Quotation/AddQuotation";
import QuotationView from "../pages/Home/Quotation/QuotationView";
import QuotationList from "../pages/Home/Quotation/QuotationList";
import UpdateQuotation from "../pages/Home/Quotation/UpdateQuotation";
import CustomerList from "../pages/Home/Customer/CustomerList";
import CustomerProfile from "../pages/Home/Customer/CustomerProfile";
import EmployeeList from "../pages/Home/Employee/EmployeeList";
import UpdateEmployee from "../pages/Home/Employee/UpdateEmployee";
import EmployeeProfile from "../pages/Home/Employee/EmployeeProfile";
import AddSuppliers from "../pages/Home/Suppliers/AddSuppliers";
import SupplierList from "../pages/Home/Suppliers/SupplierList";
import UpdateSupplier from "../pages/Home/Suppliers/UpdateSupplier";
import SupplierProfile from "../pages/Home/Suppliers/SupplierProfile";
import AddPurchase from "../pages/Home/Parchase/AddPurchase";
import UpdatePurchase from "../pages/Home/Parchase/UpdatePurchase";
import CompanyList from "../pages/Home/Company/CompanyList";
import AddCompany from "../pages/Home/Company/AddCompany";
import CompanyProfile from "../pages/Home/Company/CompanyProfile";
import AddShowRoom from "../pages/Home/ShowRoom/AddShowRoom";
import ShowRoomList from "../pages/Home/ShowRoom/ShowRoomList";
import UpdateCompany from "../pages/Home/Company/UpdateCompany";
import UpdateShowRoom from "../pages/Home/ShowRoom/UpdateShowRoom";
import ShowRoomProfile from "../pages/Home/ShowRoom/ShowRoomProfile";
import EmployeeLeave from "../pages/Home/Employee/EmployeeProfile/EmployeeLeave";
import Attendance from "../pages/Home/Employee/EmployeeProfile/Attendance";
import AddAttendance from "../pages/Home/Attendance/AddAttendance";
import AttendanceList from "../pages/Home/Attendance/AttendanceList";
import UpdateExpense from "../pages/Home/Expense/UpdateExpense";
import ViewExpense from "../pages/Home/Expense/ViewExpense";
import UpdateAttendance from "../pages/Home/Attendance/UpdateAttendance";
import EmployeeSalary from "../pages/Home/Employee/EmployeeSalary";
import EmployeeOvertime from "../pages/Home/Employee/EmployeeOvertime";
import RunningProject from "../pages/Home/Projects/RunningProject";
import CompletedProject from "../pages/Home/Projects/CompletedProject";
import ViewEmployeeAttendance from "../pages/Home/Attendance/ViewEmployeeAttendance";
import EmployeeHoliday from "../pages/Holiday/Holiday";
import ShiftList from "../pages/Home/Employee/ShiftAndSchedule/ShiftList";
import UpdateBillPay from "../pages/BillPay/UpdateBillPay";
import BillPayInvoice from "../pages/BillPay/BillPayInvoice";
import PurchaseList from "../pages/Home/Parchase/PurchasList";
import Income from "../pages/Income/Income";
import IncomeList from "../pages/Income/IncomeList";
import UpdateIncome from "../pages/Income/UpdateIncome";
import Donation from "../pages/Donation/Donation";
import Brand from "../pages/Home/Brand/Brand";
import Unit from "../pages/Home/Unit/Unit";
import Barcode from "../pages/Home/Barcode/Barcode";
import ProductList from "../pages/Home/Products/ProductList";
import ExpenseList from "../pages/Home/Expense/ExpenseList";
import ProductType from "../pages/Home/ProductType/ProductType";
import CategoryList from "../pages/Home/Category/CategoryList";
import DuemoneyReceiptList from "../pages/Home/MoneyReceived/DuemoneyReceiptList";
import RecyclebinJobcardList from "../pages/Home/Recyclebin/RecyclebinJobcardList";
import RecycledQuotationList from "../pages/Home/Recyclebin/RecycledQuotationList";
import RecycledMoneyReceipt from "../pages/Home/Recyclebin/RecycledMoneyReceipt";
import RecycledbinCustomerList from "../pages/Home/Recyclebin/RecycledbinCustomerList";
import RecycledbinCompanyList from "../pages/Home/Recyclebin/RecycledbinCompanyList";
import RecycledbinShowRoomList from "../pages/Home/Recyclebin/RecycledbinShowRoomList";
import RecycledbinEmployeeList from "../pages/Home/Recyclebin/RecycledbinEmployeeList";
import RecyclebinSupplierList from "../pages/Home/Recyclebin/RecyclebinSupplierList";
import RecycledbinInvoiceList from "../pages/Home/Recyclebin/RecycledbinInvoiceList";
import ExpenseCategoryList from "../pages/Home/Expense/ExpenseCategoryList";
import AllCustomerList from "../pages/Home/Customer/AllCustomerList";
import Backup from "../pages/Backup/Backup";
import RestoreDatabase from "../pages/Backup/RestoreDatabase";
import CreateHoliday from "../pages/Holiday/CreateHoliday";
import CreateEmployeeOverTime from "../pages/Home/Employee/CreateEmployeeOverTime";
import UpdateEmployeeOvertime from "../pages/Home/Employee/UpdateEmployeeOvertime";
import UpdateHoliday from "../pages/Holiday/UpdateHoliday";
import AddPaybill from "../pages/BillPay/AddPaybill";
import BillPayList from "../pages/BillPay/BillPayList";
import BillPayHistory from "../pages/BillPay/BillPayHistory";
import UpdateEmployeeSalary from "../pages/Home/Employee/UpdateEmployeeSalary";
import Signup from "../pages/Signup/Signup";
import RegisterPage from "../pages/Login/Register";
import TenantRegistrationPage from "../pages/Login/TenantRegister";
import SubscriptionPage from "../pages/Login/Subscription";
import PricingPage from "../pages/Login/PricingPage";
import InventoryDashboard from "../pages/Inventory/InventoryDashboard";
import ExpiredProduct from "../pages/Inventory/ExpiredProduct";
import LowStock from "../pages/Inventory/LowStock";
import Variants from "../pages/Inventory/Variants";
import Warranties from "../pages/Inventory/Warranties";
import StockPage from "../pages/Inventory/Stock";
import RemoveStock from "../pages/Inventory/RemoveStock";
import PurchaseReturn from "../pages/Inventory/PurchaseReturn";
import PurchaseOrder from "../pages/Inventory/PurchaseOrder";
import PurchaseHistory from "../pages/Inventory/PurchaseHistory";
import StockTransferPage from "../pages/Inventory/StockTransper";
import ExpiredProductsReportPage from "../pages/Reports/ExpiredProductReport";
import LowStockReportPage from "../pages/Reports/LowStockReport";
import ProductStockReportPage from "../pages/Reports/ProductStockReport";
import DailyStockMovementReportPage from "../pages/Reports/DailyStockReport";
import ReportsPage from "../pages/Reports/Report";
import PurchaseReturnList from "../pages/Inventory/PurchaseReturnList";
import PurchaseReturnUpdate from "../pages/Inventory/PurchaseReturnUpdate";
import WarehouseManagement from "../pages/Inventory/WarehouseManagement";
import StockAdjustment from "../pages/Inventory/Adjustment/AdjustmentList";
import AddAdjustment from "../pages/Inventory/Adjustment/AddAdjustment";
import QuantityAdjustment from "../pages/Inventory/Adjustment/AdjustmentList";
import CreateTenant from "../pages/Tenant/CreateTenant";
import LandingPage from "../pages/Login/LandingPage";
import SubscriptionManagement from "../pages/Subscription/Subscription";
import Login from "../pages/Login/Login";
import AdminUserListPage from "../pages/Home/Profile/AllUserList";
import UserProfilePage from "../pages/Home/Profile/Profile";
import UpdateProfile from "../pages/Home/Profile/UpdateProfile";
import AllTenantList from "../pages/Home/Tenant/AllTenantList";
import AllUserList from "../pages/Home/Tenant/AllUserList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "create-tenant",
        element: <CreateTenant />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "tenant",
        element: <TenantRegistrationPage />,
      },

      {
        path: "subscription",
        element: <SubscriptionManagement />,
      },
      {
        path: "subscription",
        element: <SubscriptionPage />,
      },
      {
        path: "pricing",
        element: <PricingPage />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      // <PrivateRoute>
      //   <DashboardLayout />
      // </PrivateRoute>
      <DashboardLayout />
    ),
    children: [
      {
        path: "/dashboard",
        element: <Home />,
      },

      {
        path: "addjob",
        element: <AddJobCard />,
      },
      {
        path: "preview",
        element: <PreviewJobCard />,
      },
      {
        path: "update-jobcard",
        element: <UpdateJobCard />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "invoice",
        element: <Invoice />,
      },

      {
        path: "product-list",
        element: <ProductList />,
      },
      {
        path: "adjustment",
        element: <StockAdjustment />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "update-product",
        element: <UpdateProduct />,
      },
      {
        path: "update-product",
        element: <UpdateProduct />,
      },
      {
        path: "customer-list",
        element: <CustomerList />,
      },
      {
        path: "update-customer",
        element: <UpdateCustomer />,
      },
      {
        path: "add-customer",
        element: <AddCustomer />,
      },
      {
        path: "customer-profile",
        element: <CustomerProfile />,
      },
      {
        path: "company-profile",
        element: <CompanyProfile />,
      },
      {
        path: "add-company",
        element: <AddCompany />,
      },
      {
        path: "update-company",
        element: <UpdateCompany />,
      },

      {
        path: "company-list",
        element: <CompanyList />,
      },
      {
        path: "add-show-room",
        element: <AddShowRoom />,
      },
      {
        path: "update-show-room",
        element: <UpdateShowRoom />,
      },
      {
        path: "show-room-list",
        element: <ShowRoomList />,
      },
      {
        path: "show-room-profile",
        element: <ShowRoomProfile />,
      },
      {
        path: "expense-list",
        element: <ExpenseList />,
      },
      {
        path: "add-expense",
        element: <AddExpense />,
      },
      {
        path: "add-employee",
        element: <AddEmployee />,
      },
      {
        path: "employee-list",
        element: <EmployeeList />,
      },
      {
        path: "update-employee",
        element: <UpdateEmployee />,
      },
      {
        path: "employee-profile",
        element: <EmployeeProfile />,
      },
      {
        path: "employee-leave",
        element: <EmployeeLeave />,
      },
      {
        path: "employee-attendance",
        element: <Attendance />,
      },
      {
        path: "add-supplier",
        element: <AddSuppliers />,
      },
      {
        path: "supplier-list",
        element: <SupplierList />,
      },
      {
        path: "supplier-profile",
        element: <SupplierProfile />,
      },
      {
        path: "update-supplier",
        element: <UpdateSupplier />,
      },
      {
        path: "purchase-list",
        element: <PurchaseList />,
      },
      {
        path: "add-purchase",
        element: <AddPurchase />,
      },
      {
        path: "update-purchase",
        element: <UpdatePurchase />,
      },
      {
        path: "purchase-return-update",
        element: <PurchaseReturnUpdate />,
      },
      {
        path: "role",
        element: <Role />,
      },
      {
        path: "add-role",
        element: <AddRole />,
      },
      {
        path: "update-role",
        element: <UpdateRole />,
      },
      {
        path: "qutation",
        element: <AddQuotation />,
      },
      {
        path: "update-quotation",
        element: <UpdateQuotation />,
      },
      {
        path: "quotation-view",
        element: <QuotationView />,
      },
      {
        path: "quotation-list",
        element: <QuotationList />,
      },
      {
        path: "invoice",
        element: <Invoice />,
      },
      {
        path: "update-invoice",
        element: <UpdateInvoice />,
      },
      {
        path: "detail",
        element: <Detail />,
      },
      {
        path: "invoice-view",
        element: <ViewInvoice />,
      },

      {
        path: "jobcard-list",
        element: <JobCardList />,
      },
      {
        path: "money-receive",
        element: <MoneyReceived />,
      },
      {
        path: "money-receipt-list",
        element: <MoneyReceiptList />,
      },
      {
        path: "money-receipt-view",
        element: <MoneyReceiptView />,
      },
      {
        path: "money-receipt-update",
        element: <UpdateMoneyReceipt />,
      },
      {
        path: "money-receipt-due",
        element: <DuemoneyReceiptList />,
      },
      {
        path: "add-expanse",
        element: <AddExpense />,
      },
      {
        path: "expanse-list",
        element: <ExpenseList />,
      },
      {
        path: "update-expense",
        element: <UpdateExpense />,
      },
      {
        path: "view-expense",
        element: <ViewExpense />,
      },
      {
        path: "expense-categories",
        element: <ExpenseCategoryList />,
      },
      {
        path: "add-attendance",
        element: <AddAttendance />,
      },
      {
        path: "attendance-list",
        element: <AttendanceList />,
      },
      {
        path: "update-attendance",
        element: <UpdateAttendance />,
      },
      {
        path: "employee-salary",
        element: <EmployeeSalary />,
      },
      {
        path: "employee-salary-update",
        element: <UpdateEmployeeSalary />,
      },
      {
        path: "employee-overtime",
        element: <EmployeeOvertime />,
      },
      {
        path: "create-overtime",
        element: <CreateEmployeeOverTime />,
      },
      {
        path: "update-overtime",
        element: <UpdateEmployeeOvertime />,
      },
      {
        path: "running-project",
        element: <RunningProject />,
      },
      {
        path: "complete-project",
        element: <CompletedProject />,
      },
      {
        path: "view-attendance",
        element: <ViewEmployeeAttendance />,
      },
      {
        path: "paybill",
        element: <BillPayList />,
      },
      {
        path: "add-paybill",
        element: <AddPaybill />,
      },
      {
        path: "update-paybill",
        element: <UpdateBillPay />,
      },
      {
        path: "paybill-view",
        element: <BillPayInvoice />,
      },
      {
        path: "bill-pay-history",
        element: <BillPayHistory />,
      },

      {
        path: "holiday",
        element: <EmployeeHoliday />,
      },
      {
        path: "create-holiday",
        element: <CreateHoliday />,
      },
      {
        path: "update-holiday",
        element: <UpdateHoliday />,
      },
      {
        path: "shift-list",
        element: <ShiftList />,
      },
      {
        path: "add-income",
        element: <Income />,
      },
      {
        path: "income-list",
        element: <IncomeList />,
      },
      {
        path: "update-income",
        element: <UpdateIncome />,
      },

      {
        path: "donation",
        element: <Donation />,
      },
      {
        path: "category",
        element: <CategoryList />,
      },

      {
        path: "brand",
        element: <Brand />,
      },

      {
        path: "unit",
        element: <Unit />,
      },

      {
        path: "barcode",
        element: <Barcode />,
      },
      {
        path: "product-type",
        element: <ProductType />,
      },
      {
        path: "inventory-dashboard",
        element: <InventoryDashboard />,
      },
      {
        path: "expired-products",
        element: <ExpiredProduct />,
      },
      {
        path: "add-adjustment",
        element: <AddAdjustment />,
      },
      {
        path: "quantity-adjustment",
        element: <QuantityAdjustment />,
      },
      {
        path: "low-stocks",
        element: <LowStock />,
      },
      {
        path: "warehouse",
        element: <WarehouseManagement />,
      },
      {
        path: "variants",
        element: <Variants />,
      },

      {
        path: "warranties",
        element: <Warranties />,
      },
      {
        path: "stock-transfer",
        element: <StockTransferPage />,
      },

      {
        path: "remove-stock",
        element: <RemoveStock />,
      },
      {
        path: "expired-product-report",
        element: <ExpiredProductsReportPage />,
      },
      {
        path: "low-stock-report",
        element: <LowStockReportPage />,
      },
      {
        path: "product-stock-report",
        element: <ProductStockReportPage />,
      },
      {
        path: "daily-stock-movement",
        element: <DailyStockMovementReportPage />,
      },
      {
        path: "report",
        element: <ReportsPage />,
      },

      {
        path: "purchase-return",
        element: <PurchaseReturnList />,
      },
      {
        path: "purchase-order",
        element: <PurchaseOrder />,
      },
      {
        path: "purchase-return-add",
        element: <PurchaseReturn />,
      },
      {
        path: "purchase-history",
        element: <PurchaseHistory />,
      },
      {
        path: "stock",
        element: <StockPage />,
      },

      {
        path: "recycle-bin-jobcard-list",
        element: <RecyclebinJobcardList />,
      },
      {
        path: "recycle-bin-quotation-list",
        element: <RecycledQuotationList />,
      },
      {
        path: "recycle-bin-moneyreceipt-list",
        element: <RecycledMoneyReceipt />,
      },
      {
        path: "recycle-bin-customer-list",
        element: <RecycledbinCustomerList />,
      },
      {
        path: "recycle-bin-company-list",
        element: <RecycledbinCompanyList />,
      },
      {
        path: "recycle-bin-showroom-list",
        element: <RecycledbinShowRoomList />,
      },
      {
        path: "recycle-bin-employee-list",
        element: <RecycledbinEmployeeList />,
      },
      {
        path: "recycle-bin-supplier-list",
        element: <RecyclebinSupplierList />,
      },
      {
        path: "recycle-bin-invoice-list",
        element: <RecycledbinInvoiceList />,
      },
      {
        path: "all-customer",
        element: <AllCustomerList />,
      },
      {
        path: "all-user",
        element: <AdminUserListPage />,
      },
      {
        path: "all-user",
        element: <UserProfilePage />,
      },
      {
        path: "profile-update",
        element: <UpdateProfile />,
      },
      {
        path: "all-tenant-list",
        element: <AllTenantList />,
      },
      {
        path: "all-user-list",
        element: <AllUserList />,
      },
      {
        path: "backup",
        element: <Backup />,
      },
      {
        path: "restore",
        element: <RestoreDatabase />,
      },
    ],
  },
]);
