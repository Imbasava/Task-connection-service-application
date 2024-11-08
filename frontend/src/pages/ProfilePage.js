import React, { useState, useEffect } from 'react';

function TaskerProfile() {
  const [image, setImage] = useState(null);
  const [area, setArea] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [bio, setBio] = useState('');
  const userID = sessionStorage.getItem('userID');
  const userName = sessionStorage.getItem('name');

  // Fetch profile data when the component mounts
  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch(`http://localhost:5000/api/TaskerProfile/${userID}`, {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`, // Pass JWT for authorization
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          // Populate fields with existing data
          setArea(data.area);
          setCity(data.city);
          setState(data.state);
          setPincode(data.pincode);
          setBio(data.bio);
          if (data.image) setImage(data.image); // Handle image URL if stored as path
          
        } else {
          console.log('Profile not found or user is not authorized');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    }

    if (userID) fetchProfile();
  }, [userID]);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', image);
    formData.append('area', area);
    formData.append('city', city);
    formData.append('state', state);
    formData.append('pincode', pincode);
    formData.append('bio', bio);
    formData.append('userID', userID);

    try {
      const response = await fetch('http://localhost:5000/api/TaskerProfile/TaskerProfile', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`, // Pass JWT for authorization
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json(); // Get the response data
        const taskerProfileId = result.taskerProfileId; // Retrieve the taskerProfileId from the response
        sessionStorage.setItem('taskerProfileId', taskerProfileId); // Store the taskerProfileId in sessionStorage
        console.log('Profile updated successfully, Tasker Profile ID:', taskerProfileId);
        sessionStorage.setItem('role', 'tasker');  // or 'customer'

      } else {
        console.error('Error updating profile');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{userName}'s Tasker Profile</h1>
      <div className="flex justify-center mb-6">
        {image ? (
          <img
          src={typeof image === 'string' ? `http://localhost:5000/${image}` : URL.createObjectURL(image)}
          alt="Profile"
          className="rounded-full border-4 border-gray-300 w-32 h-32 object-cover"
        />
        
        ) : (
          <div className="rounded-full border-4 border-gray-300 w-32 h-32 flex items-center justify-center text-gray-500">
            Upload Image
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">
            Name:
            <input
              type="text"
              value={userName}
              readOnly
              className="mt-1 block w-full border rounded p-2 bg-gray-100 cursor-not-allowed"
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            Upload Image:
            <input
              type="file"
              onChange={handleImageChange}
              className="mt-1 block w-full border rounded p-2"
              required={!image} // Require only if no image is currently set
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            Area:
            <input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="mt-1 block w-full border rounded p-2"
              required
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            City:
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="mt-1 block w-full border rounded p-2"
              required
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            State:
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="mt-1 block w-full border rounded p-2"
              required
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            Pincode:
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="mt-1 block w-full border rounded p-2"
              required
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            Bio:
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="mt-1 block w-full border rounded p-2"
              rows="4"
              placeholder="Tell us about yourself..."
            />
          </label>
        </div>

        <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default TaskerProfile;
