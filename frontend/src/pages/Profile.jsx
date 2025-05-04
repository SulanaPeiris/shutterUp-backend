import React, { useState, useEffect } from "react";
import cover from "../assets/pics/im4.jpeg";
import MyPosts from "../components/profile/MyPosts";
import MyCourses from "../components/profile/MyCourses";
import MyCertifications from "../components/profile/MyCertifications";
import { useAuth } from "../context/AuthContext";
import { fetchUserById } from "../services/userService";
import EditProfileModal from "../components/profile/EditProfileModal";
import { updateUser } from "../services/userService";
import { fetchPostsByUserId } from "../services/postService";
import FollowDrawer from "../components/profile/FollowDrawer";
import { fetchFollowers, fetchFollowing } from "../services/followService";

const tabs = ["My Posts", "My Courses", "My Certifications"];

const Profile = () => {
  const { user: authUser } = useAuth(); // user from session (id only)
  const [activeTab, setActiveTab] = useState("My Posts");
  const [profile, setProfile] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [followersList, setFollowersList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    if (authUser?.id) {
      fetchUserById(authUser.id).then(setProfile).catch(console.error);
      fetchPostsByUserId(authUser.id).then(setUserPosts).catch(console.error);

      // ✅ fetch follow data for count
      fetchFollowers(authUser.id)
        .then((list) => setFollowersCount(list.length))
        .catch(console.error);

      fetchFollowing(authUser.id)
        .then((list) => setFollowingCount(list.length))
        .catch(console.error);
    }
  }, [authUser]);

  useEffect(() => {
    if (authUser?.id) {
      fetchUserById(authUser.id).then(setProfile).catch(console.error);
      fetchPostsByUserId(authUser.id).then(setUserPosts).catch(console.error);
    }
  }, [authUser]);

  const postData = [
    {
      id: 1,
      src: "/assets/pics/tiger.jpg",
      username: "johndoe",
      likes: 120,
      comments: 15,
      caption: "Wild moments in the jungle",
    },
  ];

  const [isEditing, setIsEditing] = useState(false);

  const handleProfileSave = async (updatedFields) => {
    try {
      const fullPayload = {
        ...profile, // includes required fields like email, username, password, etc.
        ...updatedFields, // overwrite with user-edited fields (name, bio, picture)
      };
      await updateUser(authUser.id, fullPayload);
      alert("Profile updated!");
      setEditOpen(false);
      const refreshed = await fetchUserById(authUser.id);
      setProfile(refreshed);
    } catch (err) {
      console.error("Failed to update profile", err);
      alert("Update failed.");
    }
  };

  if (!profile) return <div className="text-white p-8">Loading profile...</div>;

  return (
    <div className="min-h-screen bg-black text-white font-inter">
      <div className="relative">
        <img
          src={cover}
          alt="cover"
          className="w-full h-56 object-cover rounded-b-lg"
        />

        <div className="px-4 md:px-8 -mt-10 flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {profile?.profilePicture ? (
              <img
                src={profile.profilePicture}
                alt="avatar"
                onError={(e) => {
                  e.currentTarget.src = ""; // remove image if broken
                  console.warn("Broken image URL:", profile.profilePicture);
                }}
                className="w-48 h-48 rounded-full border-4 border-black object-cover -mt-8"
              />
            ) : (
              <div className="w-48 h-48 flex items-center justify-center bg-cyan-500 text-black font-bold text-5xl rounded-full border-4 border-black -mt-8 uppercase">
                {profile?.username?.[0] || "U"}
              </div>
            )}
            <div className="mt-4 md:mt-8">
              <h1 className="text-2xl font-bold">
                {profile?.username || "Unnamed User"}
              </h1>
              <div className="flex gap-10 mt-2">
                <div className="text-center">
                  <p className="text-sm text-gray-400">Posts</p>
                  <p className="font-semibold text-lg">{userPosts.length}</p>

                </div>
                <div
                  className="text-center cursor-pointer"
                  onClick={async () => {
                    const list = await fetchFollowers(authUser.id);
                    setFollowersList(list);
                    setShowFollowers(true);
                  }}
                >
                  <p className="text-sm text-gray-400">Followers</p>
                  <p className="font-semibold text-lg">{followersCount}</p>
                </div>

                <div
                  className="text-center cursor-pointer"
                  onClick={async () => {
                    const list = await fetchFollowing(authUser.id);
                    setFollowingList(list);
                    setShowFollowing(true);
                  }}
                >
                  <p className="text-sm text-gray-400">Following</p>
                  <p className="font-semibold text-lg">{followingCount}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 md:mt-0">
            <button
              className="bg-transparent border border-white rounded-full px-4 py-1 hover:bg-white hover:text-black transition"
              onClick={() => setEditOpen(true)}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="mt-0 md:px-8 px-4">
        <div className="md:ml-5 ml-0 flex flex-wrap justify-start items-start">
          <div className="text-start">
            <p className="mt-4 text-sm text-gray-300 whitespace-pre-line">
              {profile?.bio || "This user hasn't added a bio yet."}
            </p>
          </div>
        </div>

        <div className="flex space-x-6 mt-6 border-b border-gray-600">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`text-md font-medium ${
                activeTab === tab
                  ? "text-BabyBlue border-b-2 border-BabyBlue pb-3"
                  : "text-gray-400 pb-3"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "My Posts" && <MyPosts posts={userPosts} />}
        {activeTab === "My Courses" && <MyCourses />}
        {activeTab === "My Certifications" && <MyCertifications />}
      </div>

      <EditProfileModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        profile={profile}
        onSave={handleProfileSave}
      />

      <FollowDrawer
        isOpen={showFollowers}
        title="Followers"
        users={followersList}
        onClose={() => setShowFollowers(false)}
      />

      <FollowDrawer
        isOpen={showFollowing}
        title="Following"
        users={followingList}
        onClose={() => setShowFollowing(false)}
      />
    </div>
  );
};

export default Profile;
