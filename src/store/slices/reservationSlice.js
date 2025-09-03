import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reservations: [
    {
      id: '1',
      dateCreated: '2024-01-15T09:30:00.000Z',
      reservationStatus: 'pending',
      referenceNumber: 'AD123456',
      patientName: '김민수',
      contactNumber: '010-1234-5678',
      emailAddress: 'minsu.kim@email.com',
      serviceType: 'general',
      reservationDate: '2024-01-20',
      reservationTime: '10:00',
      message: '정기 검진을 받고 싶습니다.'
    },
    {
      id: '2',
      dateCreated: '2024-01-14T14:15:00.000Z',
      reservationStatus: 'confirmed',
      referenceNumber: 'AD123457',
      patientName: 'Sarah Johnson',
      contactNumber: '+1-555-0123',
      emailAddress: 'sarah.johnson@email.com',
      serviceType: 'cosmetic',
      reservationDate: '2024-01-22',
      reservationTime: '14:30',
      message: 'Teeth whitening consultation needed.'
    },
    {
      id: '3',
      dateCreated: '2024-01-13T11:45:00.000Z',
      reservationStatus: 'completed',
      referenceNumber: 'AD123458',
      patientName: '이지은',
      contactNumber: '010-9876-5432',
      emailAddress: 'jieun.lee@email.com',
      serviceType: 'orthodontics',
      reservationDate: '2024-01-18',
      reservationTime: '09:30',
      message: '교정 장치 점검'
    },
    {
      id: '4',
      dateCreated: '2024-01-12T16:20:00.000Z',
      reservationStatus: 'pending',
      referenceNumber: 'AD123459',
      patientName: 'Michael Chen',
      contactNumber: '+1-555-0456',
      emailAddress: 'michael.chen@email.com',
      serviceType: 'emergency',
      reservationDate: '2024-01-19',
      reservationTime: '15:00',
      message: 'Severe tooth pain, need immediate attention.'
    },
    {
      id: '5',
      dateCreated: '2024-01-11T10:10:00.000Z',
      reservationStatus: 'confirmed',
      referenceNumber: 'AD123460',
      patientName: '박서연',
      contactNumber: '010-5555-1234',
      emailAddress: 'seoyeon.park@email.com',
      serviceType: 'pediatric',
      reservationDate: '2024-01-25',
      reservationTime: '11:00',
      message: '7세 아이 첫 치과 검진'
    },
    {
      id: '6',
      dateCreated: '2024-01-10T13:30:00.000Z',
      reservationStatus: 'cancelled',
      referenceNumber: 'AD123461',
      patientName: 'David Wilson',
      contactNumber: '+1-555-0789',
      emailAddress: 'david.wilson@email.com',
      serviceType: 'surgery',
      reservationDate: '2024-01-17',
      reservationTime: '16:30',
      message: 'Wisdom tooth extraction consultation.'
    },
    {
      id: '7',
      dateCreated: '2024-01-09T08:45:00.000Z',
      reservationStatus: 'pending',
      referenceNumber: 'AD123462',
      patientName: '정현우',
      contactNumber: '010-7777-8888',
      emailAddress: 'hyunwoo.jung@email.com',
      serviceType: 'general',
      reservationDate: '2024-01-23',
      reservationTime: '10:30',
      message: '치아 통증으로 인한 진료'
    },
    {
      id: '8',
      dateCreated: '2024-01-08T15:15:00.000Z',
      reservationStatus: 'completed',
      referenceNumber: 'AD123463',
      patientName: 'Emily Rodriguez',
      contactNumber: '+1-555-0321',
      emailAddress: 'emily.rodriguez@email.com',
      serviceType: 'cosmetic',
      reservationDate: '2024-01-16',
      reservationTime: '14:00',
      message: 'Veneer placement consultation completed.'
    }
  ],
  currentReservation: null,
  isLoading: false,
  error: null,
  formData: {
    patientName: '',
    contactNumber: '',
    emailAddress: '',
    reservationDate: '',
    reservationTime: '',
    serviceType: '',
    message: ''
  },
  formErrors: {}
};

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    // Form data management
    updateFormData: (state, action) => {
      const { field, value } = action.payload;
      state.formData[field] = value;
      // Clear error for this field when user starts typing
      if (state.formErrors[field]) {
        delete state.formErrors[field];
      }
    },
    
    clearFormData: (state) => {
      state.formData = {
        patientName: '',
        contactNumber: '',
        emailAddress: '',
        reservationDate: '',
        reservationTime: '',
        serviceType: '',
        message: ''
      };
      state.formErrors = {};
    },
    
    // Form validation
    setFormErrors: (state, action) => {
      state.formErrors = action.payload;
    },
    
    clearFormErrors: (state) => {
      state.formErrors = {};
    },
    
    // Reservation management
    addReservation: (state, action) => {
      const newReservation = {
        id: Date.now().toString(),
        dateCreated: new Date().toISOString(),
        reservationStatus: 'pending',
        ...action.payload
      };
      state.reservations.push(newReservation);
      state.currentReservation = newReservation;
    },
    
    updateReservationStatus: (state, action) => {
      const { id, status } = action.payload;
      const reservation = state.reservations.find(r => r.id === id);
      if (reservation) {
        reservation.reservationStatus = status;
      }
    },
    
    updateReservation: (state, action) => {
      const { id, updates } = action.payload;
      const reservation = state.reservations.find(r => r.id === id);
      if (reservation) {
        Object.assign(reservation, updates);
      }
    },
    
    setCurrentReservation: (state, action) => {
      state.currentReservation = action.payload;
    },
    
    clearCurrentReservation: (state) => {
      state.currentReservation = null;
    },
    
    // Loading and error states
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    
    setError: (state, action) => {
      state.error = action.payload;
    },
    
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const {
  updateFormData,
  clearFormData,
  setFormErrors,
  clearFormErrors,
  addReservation,
  updateReservationStatus,
  updateReservation,
  setCurrentReservation,
  clearCurrentReservation,
  setLoading,
  setError,
  clearError
} = reservationSlice.actions;

export default reservationSlice.reducer;

// Selectors
export const selectReservations = (state) => state.reservation.reservations;
export const selectCurrentReservation = (state) => state.reservation.currentReservation;
export const selectFormData = (state) => state.reservation.formData;
export const selectFormErrors = (state) => state.reservation.formErrors;
export const selectIsLoading = (state) => state.reservation.isLoading;
export const selectError = (state) => state.reservation.error;
export const selectReservationById = (id) => (state) => 
  state.reservation.reservations.find(r => r.id === id);
