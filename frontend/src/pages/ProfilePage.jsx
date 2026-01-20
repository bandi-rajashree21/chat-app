import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [isRemovedLocally, setIsRemovedLocally] = useState(false);
  const [fullName, setFullName] = useState(authUser?.fullName || "");

  const handleRemoveProfile = async () => {
    setSelectedImg(null);
    setIsRemovedLocally(true);

    try {
      await updateProfile({ profilePic: null });
    } catch (err) {
      setIsRemovedLocally(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const input = e.target;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setIsRemovedLocally(false);
      setSelectedImg(base64Image);

      try {
        await updateProfile({ profilePic: base64Image, fullName: fullName });
        setSelectedImg(null);
        setIsRemovedLocally(false);
      } finally {
        try {
          input.value = "";
        } catch (err) {}
      }
    };
  };

  const handleSaveProfile = async () => {
    await updateProfile({
      fullName,
      profilePic: selectedImg || authUser?.profilePic,
    });
  };

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-2xl p-6 h-[calc(100vh-8rem)] overflow-auto">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* avatar upload section */}

          <div className="flex flex-col items-center gap-4">
            <div className="relative w-32 h-32">
              <img
                src={
                  selectedImg ||
                  (isRemovedLocally ? null : authUser?.profilePic) ||
                  "/avatar.png"
                }
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-4 border-base-200 shadow-sm"
              />

              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-1 right-1 z-10
                  bg-base-content hover:scale-105
                  p-1.5 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>

            <div className="flex flex-col items-center gap-2 mt-2">
              <p className="text-sm text-zinc-400">
                {isUpdatingProfile
                  ? "Uploading..."
                  : "Click the camera icon to update your photo"}
              </p>

              <button
                type="button"
                onClick={handleRemoveProfile}
                className={`px-3 py-2 rounded-md bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-all duration-200 ${isUpdatingProfile ? "opacity-50 pointer-events-none" : ""}`}
                disabled={isUpdatingProfile}
              >
                Remove ProfilePic
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <input
                type="text"
                className="w-full px-4 py-2.5 bg-base-200 rounded-lg border"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.email}
              </p>
            </div>
          </div>

          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>
                  {authUser?.createdAt
                    ? new Date(authUser.createdAt).toLocaleDateString()
                    : ""}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
            <div className="mt-4 text-right">
              <button
                className="btn btn-sm"
                onClick={handleSaveProfile}
                disabled={isUpdatingProfile}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
