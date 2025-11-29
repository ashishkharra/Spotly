import { useState,  } from 'react';
import { lazy } from "react";

const MotionDiv = lazy(() =>
  import("framer-motion").then((mod) => ({ default: mod.motion.div }))
);
const MotionButton = lazy(() =>
  import("framer-motion").then((mod) => ({ default: mod.motion.button }))
);
const AnimatePresence = lazy(() =>
  import("framer-motion").then((mod) => ({ default: mod.AnimatePresence }))
);
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiLock,
  FiCreditCard,
  FiShield,
  FiCalendar,
  FiDollarSign,
  FiSettings,
  FiBell,
  FiGlobe,
  FiCheck,
  FiEdit,
  FiLogOut,
  FiEye,
  FiEyeOff,
  FiDownload,
  FiTrash2,
  FiPlus,
  FiX
} from "react-icons/fi";


const authApi = () => import("../APIs/postApi").then((m) => m.authApi);
const updateApi = () => import("../APIs/postApi").then((m) => m.updateApi);
const deleteApi = () => import("../APIs/postApi").then((m) => m.deleteApi);

const profileData = () => import("../hooks/useProfile").then((m) => m.profileData());

const useToast = () =>
  import("../components/Toast/ToastProvider").then((m) => m.useToast);
const useNavigate = () =>
  import("react-router-dom").then((m) => m.useNavigate);
const userAuth = () =>
  import("../components/store/Store").then((m) => m.userAuth);


// lazy import
const { detectCardProvider, formatCardNumber, formatExpiry } = await import('../../public/assets/JS/cardVerify');

const Profile = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false)
  const [passwordDialog, setPasswordDialog] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [isAddingPayment, setIsAddingPayment] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [ownerData, setOwnerData] = useState({
    personal: {
      fullName: '',
      email: '',
      phone: '',
      profile_image_url: null,
      address: ''
    },
    business: {
      business_name: '',
      business_address: '',
      tax_id: '',
      postal_code: '',
      state: '',
      city: '',
      country: ''
    },
    payment: {
      type: '',
      cardnumber: '',
      expiry: '',
      cvv: '',
      cardholder: '',
      zipCode: '',
      lastfour: '',
      isPrimary: false
    },
    settings: {
      date_format: '',
      language: '',
      timezone: '',
      currency: ''
    },
    notifications: {
      booking_confirmations: true,
      payment_receipts: true,
      promotional_offers: false,
      new_messages: true,
      booking_reminders: true,
      frequency: 'real-time'
    },
    preview: null,
  });

  const handleInputChange = (section, e) => {
    const { name, value, type, checked, files } = e.target;

    let fieldValue;

    if (type === "checkbox") {
      fieldValue = checked;
    } else if (type === "file") {
      const file = files[0];
      fieldValue = file || null;
    } else {
      fieldValue = value;
    }

    setOwnerData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: fieldValue,
        ...(section === "payment" && name === "cardnumber"
          ? {
            lastfour: value.slice(-4),
            type: detectCardProvider(value),
          }
          : {}),
      },
      ...(type === "file"
        ? {
          preview: files[0] ? URL.createObjectURL(files[0]) : prev.preview,
        }
        : {}),
    }));
  };

  const handleRemoveFile = () => {
    setOwnerData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        profile_img_url: null,
      },
      preview: null,
    }));
  };

  const handleSave = async () => {
    setIsEditing(false);
    setLoading(true);

    try {
      const res = await updateApi.updateProfile(ownerData);
      if (res.success) {
        showToast("Profile updated successfully!", "success");
      }
    } catch (error) {
      console.log("profile update error:", error.message);
      showToast("Something went wrong during profile update!", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await authApi.logout();
      if (res.success) {
        userAuth.getState().clearUser();
        navigate('/');
        showToast("Logout successfully!", "success")
      }
    } catch (error) {
      showToast('Something went wrong!', "error")
    }
  }

  const handleSavePassword = async () => {
    setLoading(true);
    try {
      const res = await updateApi.updatePassword(oldPassword, newPassword);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      const res = await deleteApi.deleteAccount();
      if (res.success) {
        userAuth.getState().clearUser();
        navigate('/');
        showToast("Account deleted successfully!", "success");
      }
    } catch (error) {
      console.log(error.message);
      showToast("Something went wrong!", "error");
    } finally {
      setLoading(false);
    }
  }

  

  return (
    <MotionDiv className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <MotionDiv className="max-w-6xl mx-auto">
        {/* Header */}
        <MotionDiv className="flex flex-col md: flex-row justify-between items-start md:items-center mb-8">
          <MotionDiv>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Owner Profile</h1>
            <p className="text-gray-600 mt-2">Manage your personal and business information</p>
          </MotionDiv>

          <MotionDiv className="mt-4 md:mt-0 flex space-x-3">
            <MotionButton
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center cursor-pointer"
              onClick={() => setIsEditing(!isEditing)}
            >
              <FiEdit className="mr-2" />
              {isEditing ? 'Cancel Editing' : 'Edit Profile'}
            </MotionButton>

            <MotionButton
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer flex items-center"
              onClick={handleSave}
            >
              <FiCheck className="mr-2" />
              {loading ? 'Updating profile...' : 'Save Changes'}
            </MotionButton>
          </MotionDiv>
        </MotionDiv>

        <MotionDiv className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <MotionDiv className="lg:col-span-1">
            <MotionDiv className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <MotionDiv className="flex flex-col items-center">
                <MotionDiv className="bg-gradient-to-br from-blue-500 to-indigo-600 w-24 h-24 rounded-full flex items-center justify-center text-white text-4xl mb-4">
                  {ownerData?.personal?.profile_image_url ? (
                    <img src={ownerData?.personal?.profile_image_url} alt="Profile" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span>{ownerData.personal.fullName.charAt(0)}</span>
                  )}
                </MotionDiv>

                <h2 className="text-xl font-bold text-gray-800">{ownerData.personal.fullName}</h2>
                <p className="text-gray-600 flex items-center mt-1">
                  <FiMail className="mr-2" />
                  {ownerData.personal.email}
                </p>
                <p className="text-gray-600 flex items-center mt-1">
                  <FiCalendar className="mr-2" />
                  Member since {ownerData.personal.join_date}
                </p>

                <MotionDiv className="mt-6 w-full">
                  <MotionDiv className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Account Status</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">Verified</span>
                  </MotionDiv>

                  <MotionDiv className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Plan Type</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">Pro Business</span>
                  </MotionDiv>

                  <MotionDiv className="flex justify-between items-center">
                    <span className="text-gray-700">Subscription</span>
                    <span className="text-gray-800 font-medium">Active</span>
                  </MotionDiv>
                </MotionDiv>

                <MotionButton
                  onClick={handleLogout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer mt-6 w-full flex items-center justify-center py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200"
                >
                  <FiLogOut className="mr-2" />
                  Sign Out
                </MotionButton>
              </MotionDiv>
            </MotionDiv>

            <MotionDiv className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Navigation</h3>

              <MotionDiv className="space-y-2">
                <MotionButton
                  className={`flex items-center w-full p-3 rounded-lg cursor-pointer ${activeTab === 'personal'
                    ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500'
                    : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  onClick={() => setActiveTab('personal')}
                >
                  <FiUser className="mr-3" />
                  Personal Information
                </MotionButton>

                <MotionButton
                  className={`flex items-center w-full p-3 rounded-lg cursor-pointer ${activeTab === 'business'
                    ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500'
                    : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  onClick={() => setActiveTab('business')}
                >
                  <FiDollarSign className="mr-3" />
                  Business Details
                </MotionButton>

                <MotionButton
                  className={`flex items-center w-full p-3 rounded-lg cursor-pointer ${activeTab === 'payment'
                    ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500'
                    : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  onClick={() => setActiveTab('payment')}
                >
                  <FiCreditCard className="mr-3" />
                  Payment Methods
                </MotionButton>

                <MotionButton
                  className={`flex items-center w-full p-3 rounded-lg cursor-pointer ${activeTab === 'security'
                    ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500'
                    : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  onClick={() => setActiveTab('security')}
                >
                  <FiShield className="mr-3" />
                  Security
                </MotionButton>

                <MotionButton
                  className={`flex items-center w-full p-3 rounded-lg cursor-pointer ${activeTab === 'notifications'
                    ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500'
                    : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  onClick={() => setActiveTab('notifications')}
                >
                  <FiBell className="mr-3" />
                  Notifications
                </MotionButton>

                <MotionButton
                  className={`flex items-center w-full p-3 rounded-lg cursor-pointer ${activeTab === 'settings'
                    ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500'
                    : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  onClick={() => setActiveTab('settings')}
                >
                  <FiSettings className="mr-3" />
                  Account Settings
                </MotionButton>
              </MotionDiv>
            </MotionDiv>
          </MotionDiv>

          {/* Main Content */}
          <MotionDiv className="lg:col-span-2">
            {/* Personal Information */}

            {activeTab === 'personal' && (
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <MotionDiv className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    <FiUser className="mr-3 text-blue-500" />
                    Personal Information
                  </h2>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Owner
                  </span>
                </MotionDiv>

                <MotionDiv className="space-y-4">
                  <MotionDiv>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <FiUser className="mr-2" />
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="fullName"
                        value={ownerData.personal.fullName}
                        onChange={(e) => handleInputChange('personal', e)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <MotionDiv className="p-3 bg-gray-50 rounded-lg">{ownerData.personal.fullName}</MotionDiv>
                    )}
                  </MotionDiv>

                  <MotionDiv className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <MotionDiv>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <FiMail className="mr-2" />
                        Email Address
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={ownerData.personal.email}
                          onChange={(e) => handleInputChange('personal', e)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <MotionDiv className="p-3 bg-gray-50 rounded-lg">{ownerData.personal.email}</MotionDiv>
                      )}
                    </MotionDiv>

                    <MotionDiv>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <FiPhone className="mr-2" />
                        Phone Number
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={ownerData.personal.phone}
                          onChange={(e) => handleInputChange('personal', e)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <MotionDiv className="p-3 bg-gray-50 rounded-lg">{ownerData.personal.phone}</MotionDiv>
                      )}
                    </MotionDiv>
                  </MotionDiv>

                  <MotionDiv>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <FiMapPin className="mr-2" />
                      Address
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="address"
                        value={ownerData.personal.address || ''}
                        onChange={(e) => handleInputChange('personal', e)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your address"
                      />
                    ) : (
                      <MotionDiv className="p-3 bg-gray-50 rounded-lg">
                        {ownerData.personal.address || 'No address provided'}
                      </MotionDiv>
                    )}
                  </MotionDiv>

                  <MotionDiv className="pt-4">
                    <h3 className="font-medium text-gray-800 mb-3">Profile Photo</h3>
                    <MotionDiv className="flex items-center">
                      <MotionDiv className="bg-gradient-to-br from-blue-500 to-indigo-600 w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl mr-4">
                        {ownerData.personal.profile_image_url ? (
                          <img src={ownerData.personal.profile_image_url} name="profile_img_url" alt="Profile" className="w-full h-full rounded-full object-cover" />
                        ) : (
                          <span>{ownerData.personal.fullName.charAt(0)}</span>
                        )}
                      </MotionDiv>
                      {isEditing && (
                        <MotionDiv className="space-x-3">
                          <label className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer">
                            Upload New
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              name='profile_image_url'
                              onChange={(e) => handleInputChange('personal', e)}
                            />
                          </label>

                          {ownerData.preview && (
                            <MotionDiv className="relative inline-block mt-3">
                              <img
                                src={ownerData.preview}
                                alt="Preview"
                                className="h-24 w-24 object-cover rounded-lg border"
                              />
                              <MotionButton
                                type="MotionButton"
                                onClick={handleRemoveFile}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
                              >
                                ×
                              </MotionButton>
                            </MotionDiv>
                          )}
                        </MotionDiv>

                      )}
                    </MotionDiv>
                  </MotionDiv>
                </MotionDiv>
              </MotionDiv>
            )}

            {/* Business Details */}
            {activeTab === 'business' && (
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <MotionDiv className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    <FiDollarSign className="mr-3 text-blue-500" />
                    Business Details
                  </h2>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    Active
                  </span>
                </MotionDiv>

                <MotionDiv className="space-y-4">
                  {/* Business Name */}
                  <MotionDiv>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <FiUser className="mr-2" />
                      Business Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="business_name"
                        value={ownerData.business?.business_name ?? ""}
                        onChange={(e) => handleInputChange('business', e)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <MotionDiv className="p-3 bg-gray-50 rounded-lg">{ownerData.business?.business_name}</MotionDiv>
                    )}
                  </MotionDiv>

                  {/* Business Address */}
                  <MotionDiv>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <FiMapPin className="mr-2" />
                      Business Address
                    </label>
                    {isEditing ? (
                      <textarea
                        name="business_address"
                        value={ownerData.business?.business_address ?? ""}
                        onChange={(e) => handleInputChange('business', e)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24"
                      />
                    ) : (
                      <MotionDiv className="p-3 bg-gray-50 rounded-lg">{ownerData.business?.business_address}</MotionDiv>
                    )}
                  </MotionDiv>

                  {/* Grid for Tax ID + Business Type */}
                  <MotionDiv className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <MotionDiv>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <FiShield className="mr-2" />
                        Tax ID
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="tax_id"
                          value={ownerData.business?.tax_id ?? ""}
                          onChange={(e) => handleInputChange('business', e)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <MotionDiv className="p-3 bg-gray-50 rounded-lg">{ownerData.business?.tax_id}</MotionDiv>
                      )}
                    </MotionDiv>

                    <MotionDiv>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="city"
                          value={ownerData.business?.city ?? ""}
                          onChange={(e) => handleInputChange('business', e)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <MotionDiv className="p-3 bg-gray-50 rounded-lg">{ownerData.business?.city}</MotionDiv>
                      )}
                    </MotionDiv>
                  </MotionDiv>

                  {/* City, State, Postal Code, Country */}
                  <MotionDiv className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <MotionDiv>
                      <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="state"
                          value={ownerData.business?.state ?? ""}
                          onChange={(e) => handleInputChange('business', e)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <MotionDiv className="p-3 bg-gray-50 rounded-lg">{ownerData.business?.state}</MotionDiv>
                      )}
                    </MotionDiv>

                    <MotionDiv>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="postal_code"
                          value={ownerData.business.postal_code}
                          onChange={(e) => handleInputChange('business', e)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <MotionDiv className="p-3 bg-gray-50 rounded-lg">{ownerData.business.postal_code}</MotionDiv>
                      )}
                    </MotionDiv>
                  </MotionDiv>

                  <MotionDiv className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <MotionDiv>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="country"
                          value={ownerData.business?.country ?? ""}
                          onChange={(e) => handleInputChange('business', e)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <MotionDiv className="p-3 bg-gray-50 rounded-lg">{ownerData.business?.country}</MotionDiv>
                      )}
                    </MotionDiv>
                  </MotionDiv>
                </MotionDiv>
              </MotionDiv>
            )}

            {/* Payment Methods */}
            {activeTab === 'payment' && (
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <MotionDiv className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    <FiCreditCard className="mr-3 text-blue-500" />
                    Payment Methods
                  </h2>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {/* {paymentMethods.filter(p => p.isPrimary).length > 0 ? 'Primary' : 'Add Payment'} */}
                  </span>
                </MotionDiv>

                <MotionDiv className="space-y-6">
                  {/* Existing Payment Methods */}
                  {/* {paymentMethods.map((payment) => (
                    <MotionDiv key={payment.id} className="border border-gray-200 rounded-xl p-5">
                      <MotionDiv className="flex justify-between items-center mb-4">
                        <MotionDiv className="flex items-center">
                          <MotionDiv className="bg-blue-500 text-white p-3 rounded-lg mr-4">
                            <FiCreditCard className="text-xl" />
                          </MotionDiv>
                          <MotionDiv>
                            <h3 className="font-bold text-gray-800">{payment.provider} ending in {payment.lastfour}</h3>
                            <p className="text-gray-600">Expires {payment.expiry}</p>
                          </MotionDiv>
                        </MotionDiv>
                        {payment.isPrimary ? (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                            Primary
                          </span>
                        ) : null}
                      </MotionDiv>

                      <MotionDiv className="flex justify-end space-x-3">
                        {!payment.isPrimary && (
                          <MotionButton
                            onClick={() => setAsPrimary(payment.id)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                          >
                            Make Primary
                          </MotionButton>
                        )}
                        <MotionButton className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                          <FiEdit className="inline mr-1 cursor-pointer" /> Edit
                        </MotionButton>
                        <MotionButton
                          onClick={() => deletePaymentMethod(payment.id)}
                          className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors cursor-pointer"
                        >
                          <FiTrash2 className="inline mr-1" /> Delete
                        </MotionButton>
                      </MotionDiv>
                    </MotionDiv>
                  ))} */}

                  {/* Add Payment Method Button */}
                  {!isAddingPayment && (
                    <MotionDiv
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border border-gray-200 rounded-xl p-5 cursor-pointer hover:border-blue-300 transition-colors"
                      onClick={() => setIsAddingPayment(true)}
                    >
                      <MotionDiv className="flex justify-between items-center">
                        <MotionDiv className="flex items-center">
                          <MotionDiv className="bg-gray-200 p-3 rounded-lg mr-4">
                            <FiPlus className="text-xl text-gray-600" />
                          </MotionDiv>
                          <MotionDiv>
                            <h3 className="font-bold text-gray-800">Add Payment Method</h3>
                            <p className="text-gray-600">Credit card or bank account</p>
                          </MotionDiv>
                        </MotionDiv>
                        <MotionButton className="px-4 py-2 cursor-pointer bg-white border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                          Add New
                        </MotionButton>
                      </MotionDiv>
                    </MotionDiv>
                  )}

                  {/* Add Payment Method Form */}
                  <AnimatePresence>
                    {isAddingPayment && (
                      <MotionDiv
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border border-blue-300 rounded-xl p-5 bg-blue-50"
                      >
                        <MotionDiv className="flex justify-between items-center mb-4">
                          <h3 className="font-bold text-gray-800">Add New Payment Method</h3>
                          <MotionButton
                            onClick={() => setIsAddingPayment(false)}
                            className="cursor-pointer text-gray-500 hover:text-gray-700"
                          >
                            <FiX size={20} />
                          </MotionButton>
                        </MotionDiv>



                        <MotionDiv className="space-y-4">

                          <MotionDiv>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Card Type
                            </label>
                            {isEditing ? (
                              <input
                                type="text"
                                name="type"
                                readOnly
                                value={ownerData.payment.type}
                                onChange={(e) => handleInputChange('payment', e)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            ) : (
                              <MotionDiv className="p-3 bg-gray-50 rounded-lg">{ownerData.payment.type}</MotionDiv>
                            )}
                          </MotionDiv>

                          <MotionDiv>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Card Number
                            </label>
                            {isEditing ? (
                              <input
                                type="text"
                                name="cardnumber"
                                value={formatCardNumber(ownerData.payment.cardnumber)}
                                onChange={(e) => {
                                  e.target.value = formatCardNumber(e.target.value);
                                  handleInputChange('payment', e);
                                }}
                                placeholder="1234 5678 9012 3456"
                                maxLength={19}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            ) : (
                              <MotionDiv className="p-3 bg-gray-50 rounded-lg">{ownerData.payment.cardnumber}</MotionDiv>
                            )}
                          </MotionDiv>

                          <MotionDiv className="grid grid-cols-2 gap-4">
                            <MotionDiv>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Expiry Date
                              </label>
                              {isEditing ? (
                                <input
                                  type="text"
                                  name="expiry"
                                  value={formatExpiry(ownerData.payment.expiry)}
                                  onChange={(e) => {
                                    e.target.value = formatExpiry(e.target.value);
                                    handleInputChange('payment', e);
                                  }}
                                  placeholder="MM/YY"
                                  maxLength={5}
                                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                              ) : (
                                <MotionDiv className="p-3 bg-gray-50 rounded-lg">{formatExpiry(ownerData.payment.expiry)}</MotionDiv>
                              )}
                            </MotionDiv>

                            <MotionDiv>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                CVV
                              </label>
                              {isEditing ? (
                                <input
                                  type="text"
                                  name="cvv"
                                  value={ownerData.payment.cvv}
                                  onChange={(e) => handleInputChange('payment', e)}
                                  placeholder="123"
                                  maxLength={4}
                                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />) : (
                                <MotionDiv className="p-3 bg-gray-50 rounded-lg">{ownerData.payment.cvv}</MotionDiv>
                              )}
                            </MotionDiv>
                          </MotionDiv>

                          <MotionDiv>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Name on Card
                            </label>
                            {isEditing ? (
                              <input
                                type="text"
                                name="cardholder"
                                value={ownerData.payment.cardholder}
                                onChange={(e) => handleInputChange('payment', e)}
                                placeholder="John Doe"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />) : (
                              <MotionDiv className="p-3 bg-gray-50 rounded-lg">{ownerData.payment.cardholder}</MotionDiv>
                            )}
                          </MotionDiv>

                          <MotionDiv>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              ZIP / Postal Code
                            </label>
                            {isEditing ? (
                              <input
                                type="text"
                                name="zipCode"
                                value={ownerData.payment.zipCode}
                                onChange={(e) => handleInputChange('payment', e)}
                                placeholder="12345"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            ) : (
                              <MotionDiv className="p-3 bg-gray-50 rounded-lg">{ownerData.payment.zipCode}</MotionDiv>
                            )}
                          </MotionDiv>

                          <MotionDiv className="flex items-center">
                            {isEditing ? (
                              <input
                                type="checkbox"
                                name="isPrimary"
                                checked={ownerData.payment.isPrimary}
                                onChange={(e) => handleInputChange('payment', e)}
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                              />
                            ) : (
                              <MotionDiv className="p-3 bg-gray-50 rounded-lg">{formatExpiry(ownerData.payment.expiry)}</MotionDiv>
                            )}
                            <label htmlFor="isPrimary" className="ml-2 block text-sm text-gray-700">
                              Set as primary payment method
                            </label>
                          </MotionDiv>

                          <MotionDiv className="flex justify-end space-x-3 pt-4">
                            <MotionButton
                              onClick={() => setIsAddingPayment(false)}
                              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                            >
                              Cancel
                            </MotionButton>
                          </MotionDiv>
                        </MotionDiv>
                      </MotionDiv>
                    )}
                  </AnimatePresence>

                  {/* Payout History */}
                  <MotionDiv className="pt-4">
                    <h3 className="font-medium text-gray-800 mb-3">Payout History</h3>
                    <MotionDiv className="bg-gray-50 rounded-lg p-4">
                      <MotionDiv className="flex justify-between items-center py-3 border-b border-gray-200">
                        <MotionDiv>
                          <MotionDiv className="font-medium text-gray-800">August Payout</MotionDiv>
                          <MotionDiv className="text-sm text-gray-600">Aug 15, 2023</MotionDiv>
                        </MotionDiv>
                        <MotionDiv className="text-green-600 font-bold">$9,450.00</MotionDiv>
                      </MotionDiv>

                      <MotionDiv className="flex justify-between items-center py-3 border-b border-gray-200">
                        <MotionDiv>
                          <MotionDiv className="font-medium text-gray-800">July Payout</MotionDiv>
                          <MotionDiv className="text-sm text-gray-600">Jul 15, 2023</MotionDiv>
                        </MotionDiv>
                        <MotionDiv className="text-green-600 font-bold">$8,720.00</MotionDiv>
                      </MotionDiv>

                      <MotionDiv className="flex justify-between items-center py-3">
                        <MotionDiv>
                          <MotionDiv className="font-medium text-gray-800">June Payout</MotionDiv>
                          <MotionDiv className="text-sm text-gray-600">Jun 15, 2023</MotionDiv>
                        </MotionDiv>
                        <MotionDiv className="text-green-600 font-bold">$7,980.00</MotionDiv>
                      </MotionDiv>
                    </MotionDiv>
                  </MotionDiv>
                </MotionDiv>
              </MotionDiv>
            )}

            {/* Notification Preferences */}
            {activeTab === 'notifications' && (
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <MotionDiv className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    <FiBell className="mr-3 text-blue-500" />
                    Notification Preferences
                  </h2>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Customized
                  </span>
                </MotionDiv>

                <MotionDiv className="space-y-6">
                  <MotionDiv>
                    <h3 className="font-medium text-gray-800 mb-4">Email Notifications</h3>
                    <MotionDiv className="space-y-4">
                      <MotionDiv className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                        <MotionDiv>
                          <h4 className="font-medium text-gray-800">Booking Confirmations</h4>
                          <p className="text-gray-600 text-sm">Receive emails when customers book your services</p>
                        </MotionDiv>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="booking_confirmations"
                            className="sr-only peer"
                            onChange={(e) => handleInputChange('notifications', e)}
                            checked={ownerData.notifications.booking_confirmations}
                            disabled={!isEditing}
                          />
                          <MotionDiv className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:border after:border-gray-300 after:transition-all peer-checked:after:translate-x-full"></MotionDiv>
                        </label>
                      </MotionDiv>

                      <MotionDiv className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                        <MotionDiv>
                          <h4 className="font-medium text-gray-800">Payment Receipts</h4>
                          <p className="text-gray-600 text-sm">Get receipts for all transactions</p>
                        </MotionDiv>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="payment_receipts"
                            className="sr-only peer"
                            onChange={(e) => handleInputChange('notifications', e)}
                            checked={ownerData.notifications.payment_receipts}
                            disabled={!isEditing}
                          />
                          <MotionDiv className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:border after:border-gray-300 after:transition-all peer-checked:after:translate-x-full"></MotionDiv>
                        </label>
                      </MotionDiv>

                      <MotionDiv className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                        <MotionDiv>
                          <h4 className="font-medium text-gray-800">Promotional Offers</h4>
                          <p className="text-gray-600 text-sm">Receive special offers and discounts</p>
                        </MotionDiv>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="promotional_offers"
                            className="sr-only peer"
                            onChange={(e) => handleInputChange('notifications', e)}
                            checked={ownerData.notifications.promotional_offers}
                            disabled={!isEditing}
                          />
                          <MotionDiv className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:border after:border-gray-300 after:transition-all peer-checked:after:translate-x-full"></MotionDiv>
                        </label>
                      </MotionDiv>
                    </MotionDiv>
                  </MotionDiv>

                  <MotionDiv>
                    <h3 className="font-medium text-gray-800 mb-4">Push Notifications</h3>
                    <MotionDiv className="space-y-4">
                      <MotionDiv className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                        <MotionDiv>
                          <h4 className="font-medium text-gray-800">New Messages</h4>
                          <p className="text-gray-600 text-sm">Notify me when I receive new messages</p>
                        </MotionDiv>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="new_messages"
                            className="sr-only peer"
                            onChange={(e) => handleInputChange('notifications', e)}
                            checked={ownerData.notifications.new_messages}
                            disabled={!isEditing}
                          />
                          <MotionDiv className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:border after:border-gray-300 after:transition-all peer-checked:after:translate-x-full"></MotionDiv>
                        </label>
                      </MotionDiv>

                      <MotionDiv className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                        <MotionDiv>
                          <h4 className="font-medium text-gray-800">Booking Reminders</h4>
                          <p className="text-gray-600 text-sm">Remind me of upcoming appointments</p>
                        </MotionDiv>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="booking_reminders"
                            className="sr-only peer"
                            onChange={(e) => handleInputChange('notifications', e)}
                            checked={ownerData.notifications.booking_reminders}
                            disabled={!isEditing}
                          />
                          <MotionDiv className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:border after:border-gray-300 after:transition-all peer-checked:after:translate-x-full"></MotionDiv>
                        </label>
                      </MotionDiv>
                    </MotionDiv>
                  </MotionDiv>

                  <MotionDiv className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <MotionDiv className="flex items-start">
                      <FiBell className="text-xl text-blue-500 mr-4 mt-1" />
                      <MotionDiv>
                        <h3 className="font-bold text-gray-800">Notification Frequency</h3>
                        <p className="text-gray-600 mt-1">
                          Adjust how often you receive notifications
                        </p>
                        <MotionDiv className="mt-3 flex flex-wrap gap-3">
                          <MotionButton
                            type="MotionButton"
                            onClick={() =>
                              setOwnerData((prev) => ({
                                ...prev,
                                notifications: { ...prev.notifications, frequency: 'real-time' },
                              }))
                            }
                            className={`px-4 py-2 rounded-lg ${ownerData.notifications.frequency === 'real-time'
                              ? 'bg-blue-600 text-white'
                              : 'bg-white border border-gray-300 text-gray-700'
                              }`}
                          >
                            Real-time
                          </MotionButton>

                          <MotionButton
                            type="MotionButton"
                            onClick={() =>
                              setOwnerData((prev) => ({
                                ...prev,
                                notifications: { ...prev.notifications, frequency: 'daily-digest' },
                              }))
                            }
                            className={`px-4 py-2 rounded-lg ${ownerData.notifications.frequency === 'daily-digest'
                              ? 'bg-blue-600 text-white'
                              : 'bg-white border border-gray-300 text-gray-700'
                              }`}
                          >
                            Daily Digest
                          </MotionButton>

                          <MotionButton
                            type="MotionButton"
                            onClick={() =>
                              setOwnerData((prev) => ({
                                ...prev,
                                notifications: { ...prev.notifications, frequency: 'weekly-summary' },
                              }))
                            }
                            className={`px-4 py-2 rounded-lg ${ownerData.notifications.frequency === 'weekly-summary'
                              ? 'bg-blue-600 text-white'
                              : 'bg-white border border-gray-300 text-gray-700'
                              }`}
                          >
                            Weekly Summary
                          </MotionButton>

                        </MotionDiv>
                      </MotionDiv>
                    </MotionDiv>
                  </MotionDiv>
                </MotionDiv>
              </MotionDiv>
            )}

            {/* Account Settings */}
            {activeTab === 'settings' && (
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <MotionDiv className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    <FiSettings className="mr-3 text-blue-500" />
                    Account Settings
                  </h2>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Active
                  </span>
                </MotionDiv>

                <MotionDiv className="space-y-6">
                  <MotionDiv>
                    <h3 className="font-medium text-gray-800 mb-4">Preferences</h3>
                    <MotionDiv className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <MotionDiv>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                        {isEditing ? (
                          <select
                            name="language"
                            onChange={(e) => handleInputChange('settings', e)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                          >
                            <option>English</option>
                            <option>Spanish</option>
                            <option>French</option>
                            <option>German</option>
                          </select>
                        ) : (
                          <MotionDiv className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100">
                            English
                          </MotionDiv>
                        )}
                      </MotionDiv>

                      <MotionDiv>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                        {isEditing ? (
                          <select
                            name="timezone"
                            onChange={(e) => handleInputChange('settings', e)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                          >
                            <option>Pacific Time (PT)</option>
                            <option>Mountain Time (MT)</option>
                            <option>Central Time (CT)</option>
                            <option>Eastern Time (ET)</option>
                          </select>
                        ) : (
                          <MotionDiv className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100">
                            Pacific Time (PT)
                          </MotionDiv>
                        )}
                      </MotionDiv>

                      <MotionDiv>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                        {isEditing ? (
                          <select
                            name="currency"
                            onChange={(e) => handleInputChange('settings', e)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                          >
                            <option>USD ($)</option>
                            <option>EUR (€)</option>
                            <option>GBP (£)</option>
                            <option>CAD (C$)</option>
                          </select>
                        ) : (
                          <MotionDiv className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100">
                            USD ($)
                          </MotionDiv>
                        )}

                      </MotionDiv>

                      <MotionDiv>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                        {isEditing ? (
                          <select
                            name="date_format"
                            onChange={(e) => handleInputChange('settings', e)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                          >
                            <option>MM/DD/YYYY</option>
                            <option>DD/MM/YYYY</option>
                            <option>YYYY-MM-DD</option>
                          </select>
                        ) : (
                          <MotionDiv className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100">
                            MM/DD/YYYY
                          </MotionDiv>
                        )}
                      </MotionDiv>
                    </MotionDiv>
                  </MotionDiv>

                  <MotionDiv>
                    <h3 className="font-medium text-gray-800 mb-4">Subscription</h3>
                    <MotionDiv className="border border-gray-200 rounded-xl p-5">
                      <MotionDiv className="flex justify-between items-center">
                        <MotionDiv>
                          <h4 className="font-bold text-gray-800">Pro Business Plan</h4>
                          <p className="text-gray-600">Billed monthly at $49.99</p>
                        </MotionDiv>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          Active
                        </span>
                      </MotionDiv>

                      <MotionDiv className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap gap-3">
                        <MotionButton className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          Upgrade Plan
                        </MotionButton>
                        <MotionButton className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                          Change Billing Cycle
                        </MotionButton>
                        <MotionButton className="px-4 py-2 bg-red-50 border border-red-200 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                          Cancel Subscription
                        </MotionButton>
                      </MotionDiv>
                    </MotionDiv>
                  </MotionDiv>

                  <MotionDiv>
                    <h3 className="font-medium text-gray-800 mb-4">Data Management</h3>
                    <MotionDiv className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <MotionDiv className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <MotionDiv className="flex items-center mb-3">
                          <FiDownload className="text-xl text-blue-500 mr-3" />
                          <h4 className="font-medium text-gray-800">Export Data</h4>
                        </MotionDiv>
                        <p className="text-gray-600 text-sm mb-3">
                          Download a copy of your personal data
                        </p>
                        <MotionButton className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm">
                          Request Export
                        </MotionButton>
                      </MotionDiv>

                      <MotionDiv className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <MotionDiv className="flex items-center mb-3">
                          <FiTrash2 className="text-xl text-red-500 mr-3" />
                          <h4 className="font-medium text-gray-800">Delete Data</h4>
                        </MotionDiv>
                        <p className="text-gray-600 text-sm mb-3">
                          Permanently remove your personal data
                        </p>
                        <MotionButton className="px-4 py-2 bg-white border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm">
                          Delete My Data
                        </MotionButton>
                      </MotionDiv>
                    </MotionDiv>
                  </MotionDiv>
                </MotionDiv>
              </MotionDiv>
            )}

            {/* Security */}
            {activeTab === 'security' && (
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <MotionDiv className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    <FiShield className="mr-3 text-blue-500" />
                    Security Settings
                  </h2>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    Secure
                  </span>
                </MotionDiv>

                <MotionDiv className="space-y-6">
                  <MotionDiv className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                    <MotionDiv className="flex items-center">
                      <FiLock className="text-xl text-blue-500 mr-4" />
                      <MotionDiv>
                        <h3 className="font-bold text-gray-800">Password</h3>
                        <p className="text-gray-600">Last changed 3 months ago</p>
                      </MotionDiv>
                    </MotionDiv>
                    <MotionButton onClick={() => setPasswordDialog(prev => !prev)} className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer">
                      Change Password
                    </MotionButton>
                  </MotionDiv>

                  {passwordDialog && (
                    <MotionDiv className='p-3 flex flex-col gap-3 border border-gray-300 rounded-xl'>

                      <MotionDiv className="flex border rounded-xl items-center">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="oldPassword"
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                          placeholder="Enter Old Password"
                          className="w-full p-3 outline-none"
                        />

                        {oldPassword && (
                          <MotionButton
                            type="MotionButton"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="px-3 py-2 cursor-pointer"
                          >
                            {showPassword ? <FiEyeOff size={24} /> : <FiEye size={24} />}
                          </MotionButton>
                        )}
                      </MotionDiv>

                      <MotionDiv className="flex border rounded-xl items-center">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="newPassword"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter New Password"
                          className="w-full p-3 outline-none"
                        />

                        {newPassword && (
                          <MotionButton
                            type="MotionButton"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="px-3 py-2 cursor-pointer"
                          >
                            {showPassword ? <FiEyeOff size={24} /> : <FiEye size={24} />}
                          </MotionButton>
                        )}
                      </MotionDiv>

                      <MotionButton onClick={handleSavePassword} className="px-4 py-2 bg-blue-600 text-white rounded-lg w-fit cursor-pointer">Save changed password</MotionButton>
                    </MotionDiv>
                  )}

                  <MotionDiv className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                    <MotionDiv className="flex items-center">
                      <FiShield className="text-xl text-blue-500 mr-4" />
                      <MotionDiv>
                        <h3 className="font-bold text-gray-800">Two-Factor Authentication</h3>
                        <p className="text-gray-600">
                          {/* {ownerData.security.twoFactor
                            ? 'Enabled (recommended)'
                            : 'Disabled'} */}
                        </p>
                      </MotionDiv>
                    </MotionDiv>
                    <MotionDiv className="flex items-center">
                      {/* <span className={`mr-4 ${ownerData.security.twoFactor ? 'text-green-600' : 'text-gray-400'}`}>
                        {ownerData.security.twoFactor ? 'ON' : 'OFF'}
                      </span> */}
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          // checked={ownerData.security.twoFactor}
                          readOnly
                        />
                        <MotionDiv className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></MotionDiv>
                      </label>
                    </MotionDiv>
                  </MotionDiv>

                  <MotionDiv className="p-4 bg-gray-50 rounded-xl">
                    <MotionDiv className="flex items-center mb-3">
                      <FiGlobe className="text-xl text-blue-500 mr-4" />
                      <h3 className="font-bold text-gray-800">Recent Login Activity</h3>
                    </MotionDiv>

                    <MotionDiv className="space-y-3">
                      <MotionDiv className="flex justify-between items-center py-2">
                        <MotionDiv>
                          <MotionDiv className="font-medium text-gray-800">San Francisco, CA</MotionDiv>
                          <MotionDiv className="text-sm text-gray-600">
                            {/* {ownerData.security.lastLogin} */}
                          </MotionDiv>
                        </MotionDiv>
                        <MotionDiv className="text-green-600 font-medium">Current Session</MotionDiv>
                      </MotionDiv>

                      <MotionDiv className="flex justify-between items-center py-2">
                        <MotionDiv>
                          <MotionDiv className="font-medium text-gray-800">New York, NY</MotionDiv>
                          <MotionDiv className="text-sm text-gray-600">Yesterday at 2:30 PM</MotionDiv>
                        </MotionDiv>
                        <MotionDiv className="text-gray-600">Recognized device</MotionDiv>
                      </MotionDiv>
                    </MotionDiv>
                  </MotionDiv>

                  <MotionDiv className="p-4 bg-red-50 rounded-xl border border-red-200">
                    <MotionDiv className="flex items-center">
                      <FiShield className="text-xl text-red-500 mr-4" />
                      <MotionDiv>
                        <h3 className="font-bold text-gray-800">Danger Zone</h3>
                        <p className="text-gray-600">
                          Permanently delete your account and all associated data
                        </p>
                      </MotionDiv>
                    </MotionDiv>

                    <MotionDiv className="mt-4 flex justify-end">
                      <MotionButton onClick={handleDeleteAccount} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                        Delete Account
                      </MotionButton>
                    </MotionDiv>
                  </MotionDiv>
                </MotionDiv>
              </MotionDiv>
            )}
          </MotionDiv>
        </MotionDiv>
      </MotionDiv>
    </MotionDiv>
  );
};

export default Profile;