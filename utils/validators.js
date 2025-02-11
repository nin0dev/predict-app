export const validateAdTitle = (title) => {
    if (!title || title.trim() === '') {
      return 'Le titre est obligatoire.';
    }
    if (title.length < 3) {
      return 'Le titre doit contenir au moins 3 caractères.';
    }
    return null;
  };
  
  export const validatePrice = (price) => {
    if (!price) {
      return 'Le prix est obligatoire.';
    }
    if (isNaN(price) || price <= 0) {
      return 'Le prix doit être un nombre positif.';
    }
    return null;
  };
  
  export const validateLocation = (location) => {
    if (!location || !location.latitude || !location.longitude) {
      return 'La localisation est obligatoire.';
    }
    return null;
  };