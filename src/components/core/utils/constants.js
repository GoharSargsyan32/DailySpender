export const regexpValidation = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

export const ROUTE_CONSTANTS = {
  LOGIN: '/login',
  REGISTER: '/register',
  FORM: '/form',
}

export const FIRESTORE_PATH_NAMES = {
  REGISTERED_USERS: 'profiles',
  ISSUES: "issues"
}

export const STORAGE_PATH_NAMES = {
  PROFILE_IMAGES: 'profile_images'
} 