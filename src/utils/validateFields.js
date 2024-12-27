export const validateFields = (formData) => {
    const errors = {};
  
    // Validate Name
    if (!formData.name || formData.name.trim() === "") {
      errors.name = "Name is required.";
    } else if (formData.name.length < 2) {
      errors.name = "Name must be at least 2 characters long.";
    }
  
    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || formData.email.trim() === "") {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Enter a valid email address.";
    }
  
    // Validate Phone
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone || formData.phone.trim() === "") {
      errors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = "Enter a valid 10-digit phone number.";
    }
  
    // Validate Address Fields
  
      if (!formData.addressLine1 || formData.addressLine1.trim() === "") {
        
        errors.addressLine1 = "Address Line 1 is required.";
      }
  
      if (!formData.city || formData.city.trim() === "") {
        errors.city = "City is required.";
      }
  
      if (!formData.state || formData.state.trim() === "") {
        errors.state = "State is required.";
      }
  
      if (!formData.pincode || formData.pincode.trim() === "") {
        errors.pincode = "Pincode is required.";
      } else if (!/^[0-9]{6}$/.test(formData.pincode)) {
        errors.pincode = "Enter a valid 6-digit pincode.";
      }
    
  
    // File Upload Validation
    
      const allowedFileTypes = ["image/png", "application/pdf"];
      if (!allowedFileTypes.includes(formData?.singleFile?.type)) {
        errors.singleFile = "File type must be PNG or PDF.";
      }
    
  
    // Multi-File Upload Validation
    if(formData.multiFiles.length===0){
      errors.multiFiles = "Please upload minimum 1 file.";
    }
    if (formData.multiFiles && formData.multiFiles.length > 5) {
      errors.multiFiles = "You can upload a maximum of 5 files.";
    }
  
    return errors;
  };
  