import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import RoleProtectedRoute, { AdminRoute } from '../components/RoleProtectedRoute';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import AssetsListPage from '../features/assets/pages/AssetsListPage';
import AssetFormPage from '../features/assets/pages/AssetFormPage';
import AssetProfilePage from '../features/assets/pages/AssetProfilePage';
import AssetsBulkUploadPage from '../features/assets/pages/AssetsBulkUploadPage';
import InspectionsOverviewPage from '../features/inspections/pages/InspectionsOverviewPage';
import InspectionEntryPage from '../features/inspections/pages/InspectionEntryPage';
import InspectionsBulkUploadPage from '../features/inspections/pages/InspectionsBulkUploadPage';
import RulesListPage from '../features/rules/pages/RulesListPage';
import RuleFormPage from '../features/rules/pages/RuleFormPage';
import RuleSimulationPage from '../features/rules/pages/RuleSimulationPage';
import HealthAnalyticsPage from '../pages/HealthAnalyticsPage';
import AnomaliesPage from '../pages/AnomaliesPage';
import AlertsListPage from '../features/alerts/pages/AlertsListPage';
import AlertDetailPage from '../features/alerts/pages/AlertDetailPage';
import MaintenanceWorkOrdersPage from '../features/maintenance/pages/MaintenanceWorkOrdersPage';
import CreateWorkOrderPage from '../features/maintenance/pages/CreateWorkOrderPage';
import RiskPrioritizationPage from '../pages/RiskPrioritizationPage';
import ReportsHomePage from '../features/reports/pages/ReportsHomePage';
import ZoneSummaryPage from '../features/reports/pages/ZoneSummaryPage';
import AssetLifecycleReportPage from '../features/reports/pages/AssetLifecycleReportPage';
import HistoricalDataExportPage from '../features/reports/pages/HistoricalDataExportPage';
import AdministrationDashboardPage from '../features/administration/pages/AdministrationDashboardPage';
import UserFormPage from '../features/administration/pages/UserFormPage';
import SystemConfigurationPage from '../features/administration/pages/SystemConfigurationPage';
import SettingsPage from '../pages/SettingsPage';
import UserProfilePage from '../pages/UserProfilePage';

function AppRoutes() {
  return (
    <Routes>
      {/* Public Route - Login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Routes */}
      <Route element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        
        {/* Assets - Both Admin and User can view, only Admin can create/edit */}
        <Route path="/assets" element={<AssetsListPage />} />
        <Route path="/assets/:assetId" element={<AssetProfilePage />} />
        <Route path="/assets/new" element={<AdminRoute><AssetFormPage /></AdminRoute>} />
        <Route path="/assets/bulk-upload" element={<AdminRoute><AssetsBulkUploadPage /></AdminRoute>} />
        <Route path="/assets/:assetId/edit" element={<AdminRoute><AssetFormPage /></AdminRoute>} />
        
        {/* Inspections - Both Admin and User */}
        <Route path="/inspections" element={<InspectionsOverviewPage />} />
        <Route path="/inspections/new" element={<InspectionEntryPage />} />
        <Route path="/inspections/bulk-upload" element={<InspectionsBulkUploadPage />} />
        
        {/* Rules & Thresholds - Admin Only */}
        <Route path="/rules-thresholds" element={<AdminRoute><RulesListPage /></AdminRoute>} />
        <Route path="/rules-thresholds/new" element={<AdminRoute><RuleFormPage /></AdminRoute>} />
        <Route path="/rules-thresholds/:ruleId/edit" element={<AdminRoute><RuleFormPage /></AdminRoute>} />
        <Route path="/rules-thresholds/:ruleId/simulate" element={<AdminRoute><RuleSimulationPage /></AdminRoute>} />
        
        {/* Health Analytics - Admin Only */}
        <Route path="/health-analytics" element={<AdminRoute><HealthAnalyticsPage /></AdminRoute>} />
        
        {/* Anomalies - Admin Only */}
        <Route path="/anomalies" element={<AdminRoute><AnomaliesPage /></AdminRoute>} />
        
        {/* Alerts - Both Admin and User */}
        <Route path="/alerts" element={<AlertsListPage />} />
        <Route path="/alerts/:alertId" element={<AlertDetailPage />} />
        
        {/* Maintenance - Both Admin and User */}
        <Route path="/maintenance-work-orders" element={<MaintenanceWorkOrdersPage />} />
        <Route path="/maintenance-work-orders/new" element={<CreateWorkOrderPage />} />
        
        {/* Risk - Admin Only */}
        <Route path="/risk-prioritization" element={<AdminRoute><RiskPrioritizationPage /></AdminRoute>} />
        
        {/* Reports - Both (User has limited access handled in component) */}
        <Route path="/reports" element={<ReportsHomePage />} />
        <Route path="/reports/zone-summary" element={<ZoneSummaryPage />} />
        <Route path="/reports/asset-lifecycle" element={<AssetLifecycleReportPage />} />
        <Route path="/reports/historical-export" element={<HistoricalDataExportPage />} />
        
        {/* Administration - Admin Only */}
        <Route path="/administration" element={<AdminRoute><AdministrationDashboardPage /></AdminRoute>} />
        <Route path="/administration/users/new" element={<AdminRoute><UserFormPage /></AdminRoute>} />
        <Route path="/administration/users/:userId/edit" element={<AdminRoute><UserFormPage /></AdminRoute>} />
        <Route path="/administration/system-config" element={<AdminRoute><SystemConfigurationPage /></AdminRoute>} />
        
        {/* Settings - Admin Only */}
        <Route path="/settings" element={<AdminRoute><SettingsPage /></AdminRoute>} />
        
        {/* Profile - Both Admin and User */}
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/user-profile" element={<UserProfilePage />} />
      </Route>

      {/* Fallback - Redirect to login or dashboard */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;
