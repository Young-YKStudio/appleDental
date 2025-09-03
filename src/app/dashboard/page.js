"use client";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentLanguage } from "../../store/slices/languageSlice";
import { 
  selectReservations,
  updateReservationStatus,
  updateReservation 
} from "../../store/slices/reservationSlice";
import { dashboardContent } from "../../data/dashboardContent";
import { reservationContent } from "../../data/reservationContent";
import DashboardHeader from "../../components/DashboardHeader";
import { useState, useMemo } from "react";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const language = useSelector(selectCurrentLanguage);
  const reservations = useSelector(selectReservations);
  
  const content = dashboardContent[language];
  const reservationContentData = reservationContent[language];
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  
  // Editing states
  const [editingReservation, setEditingReservation] = useState(null);
  const [editingField, setEditingField] = useState(null);

  // Filter reservations based on selected filters
  const filteredReservations = useMemo(() => {
    return reservations.filter(reservation => {
      // Status filter
      if (statusFilter !== 'all' && reservation.reservationStatus !== statusFilter) {
        return false;
      }
      
      // Service filter
      if (serviceFilter !== 'all' && reservation.serviceType !== serviceFilter) {
        return false;
      }
      
      // Date range filter
      if (dateFrom && new Date(reservation.reservationDate) < new Date(dateFrom)) {
        return false;
      }
      if (dateTo && new Date(reservation.reservationDate) > new Date(dateTo)) {
        return false;
      }
      
      return true;
    });
  }, [reservations, statusFilter, serviceFilter, dateFrom, dateTo]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = reservations.length;
    const pending = reservations.filter(r => r.reservationStatus === 'pending').length;
    const confirmed = reservations.filter(r => r.reservationStatus === 'confirmed').length;
    const completed = reservations.filter(r => r.reservationStatus === 'completed').length;
    const cancelled = reservations.filter(r => r.reservationStatus === 'cancelled').length;
    
    return { total, pending, confirmed, completed, cancelled };
  }, [reservations]);

  const handleStatusChange = (reservationId, newStatus) => {
    dispatch(updateReservationStatus({ id: reservationId, status: newStatus }));
  };

  const handleEditStart = (reservationId, field) => {
    setEditingReservation(reservationId);
    setEditingField(field);
  };

  const handleEditSave = (reservationId, field, value) => {
    dispatch(updateReservation({ id: reservationId, updates: { [field]: value } }));
    setEditingReservation(null);
    setEditingField(null);
  };

  const handleEditCancel = () => {
    setEditingReservation(null);
    setEditingField(null);
  };

  const clearFilters = () => {
    setStatusFilter('all');
    setServiceFilter('all');
    setDateFrom('');
    setDateTo('');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(language === 'ko' ? 'ko-KR' : 'en-US');
  };

  const formatTime = (timeString) => {
    // Use the localized time format from reservation content
    return reservationContentData.timeSlots[timeString] || timeString;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <DashboardHeader />
      
      <div className="pt-20 min-h-screen py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {content.title}
            </h1>
            <p className="text-lg text-gray-600">
              {content.subtitle}
            </p>
          </div>

          {/* Statistics Cards */}
          {/* <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
              <div className="text-sm text-gray-600">{content.stats.totalReservations}</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <div className="text-sm text-gray-600">{content.stats.pendingReservations}</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-2xl font-bold text-blue-600">{stats.confirmed}</div>
              <div className="text-sm text-gray-600">{content.stats.confirmedReservations}</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
              <div className="text-sm text-gray-600">{content.stats.completedReservations}</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-2xl font-bold text-red-600">{stats.cancelled}</div>
              <div className="text-sm text-gray-600">{content.stats.cancelledReservations}</div>
            </div>
          </div> */}

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{content.filters.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {content.filters.status}
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="all">{content.filters.allStatuses}</option>
                  <option value="pending">{content.status.pending}</option>
                  <option value="confirmed">{content.status.confirmed}</option>
                  <option value="completed">{content.status.completed}</option>
                  <option value="cancelled">{content.status.cancelled}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {content.filters.serviceType}
                </label>
                <select
                  value={serviceFilter}
                  onChange={(e) => setServiceFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="all">{content.filters.allServices}</option>
                  <option value="general">{content.services.general}</option>
                  <option value="cosmetic">{content.services.cosmetic}</option>
                  <option value="orthodontics">{content.services.orthodontics}</option>
                  <option value="emergency">{content.services.emergency}</option>
                  <option value="pediatric">{content.services.pediatric}</option>
                  <option value="surgery">{content.services.surgery}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {content.filters.dateRange} - {language === 'en' ? 'From' : '시작'}
                </label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {content.filters.dateRange} - {language === 'en' ? 'To' : '종료'}
                </label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={clearFilters}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-300"
              >
                {content.filters.clearFilters}
              </button>
            </div>
          </div>

          {/* Reservations Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">
                {language === 'en' ? 'Reservations' : '예약 목록'} ({filteredReservations.length})
              </h3>
            </div>
            
            {filteredReservations.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                {content.table.noData}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {content.table.headers.referenceNumber}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {content.table.headers.patientName}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {content.table.headers.contactNumber}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {content.table.headers.emailAddress}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {content.table.headers.serviceType}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {content.table.headers.reservationDate}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {content.table.headers.reservationTime}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {content.table.headers.status}
                      </th>
                      {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {content.table.headers.actions}
                      </th> */}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredReservations.map((reservation) => (
                      <tr key={reservation.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {reservation.referenceNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {reservation.patientName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {reservation.contactNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {reservation.emailAddress}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {content.services[reservation.serviceType] || reservation.serviceType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {editingReservation === reservation.id && editingField === 'reservationDate' ? (
                            <div className="flex items-center space-x-2">
                              <input
                                type="date"
                                defaultValue={reservation.reservationDate}
                                className="px-2 py-1 border border-gray-300 rounded text-xs"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    handleEditSave(reservation.id, 'reservationDate', e.target.value);
                                  } else if (e.key === 'Escape') {
                                    handleEditCancel();
                                  }
                                }}
                                onBlur={(e) => handleEditSave(reservation.id, 'reservationDate', e.target.value)}
                                autoFocus
                              />
                            </div>
                          ) : (
                            <div 
                              className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                              onClick={() => handleEditStart(reservation.id, 'reservationDate')}
                              title="Click to edit"
                            >
                              {formatDate(reservation.reservationDate)}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {editingReservation === reservation.id && editingField === 'reservationTime' ? (
                            <div className="flex items-center space-x-2">
                              <select
                                defaultValue={reservation.reservationTime}
                                className="px-2 py-1 border border-gray-300 rounded text-xs"
                                onChange={(e) => {
                                  handleEditSave(reservation.id, 'reservationTime', e.target.value);
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Escape') {
                                    handleEditCancel();
                                  }
                                }}
                                autoFocus
                              >
                                {Object.entries(reservationContentData.timeSlots || {}).map(([value, label]) => (
                                  <option key={value} value={value}>{label}</option>
                                ))}
                              </select>
                            </div>
                          ) : (
                            <div 
                              className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                              onClick={() => handleEditStart(reservation.id, 'reservationTime')}
                              title="Click to edit"
                            >
                              {formatTime(reservation.reservationTime)}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(reservation.reservationStatus)}`}>
                            {content.status[reservation.reservationStatus]}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex flex-col space-y-1">
                            <div className="flex space-x-2">
                              {reservation.reservationStatus === 'pending' && (
                                <>
                                  <button
                                    onClick={() => handleStatusChange(reservation.id, 'confirmed')}
                                    className="text-green-600 hover:text-green-900 text-xs"
                                  >
                                    {content.actions.confirm}
                                  </button>
                                  <button
                                    onClick={() => handleStatusChange(reservation.id, 'cancelled')}
                                    className="text-red-600 hover:text-red-900 text-xs"
                                  >
                                    {content.actions.cancel}
                                  </button>
                                </>
                              )}
                              {reservation.reservationStatus === 'confirmed' && (
                                <button
                                  onClick={() => handleStatusChange(reservation.id, 'completed')}
                                  className="text-blue-600 hover:text-blue-900 text-xs"
                                >
                                  {content.actions.complete}
                                </button>
                              )}
                            </div>
                            {/* <button
                              onClick={() => handleEditStart(reservation.id, 'reservationTime')}
                              className="text-gray-500 hover:text-gray-700 text-xs"
                              title="Quick edit time"
                            >
                              {language === 'en' ? 'Edit Time' : '시간 수정'}
                            </button> */}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
