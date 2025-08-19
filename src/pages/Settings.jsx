import React from "react";
import PageLayout from "../components/layouts/pageLayout";
import TextInput from "../components/common/TextInput";

const Settings = () => {
  return (
    <PageLayout title="Settings">
      <div className="space-y-6">
        <div className="bg-white shadow rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">General</h2>
          <TextInput label="App Name" placeholder="Enter app name" />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Logo Upload
            </label>
            <input
              type="file"
              className="w-full border rounded-lg px-3 py-2 text-sm text-gray-700"
            />
          </div>
          <TextInput label="Address" placeholder="Enter address" />
        </div>

        <div className="bg-white shadow rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Localization</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Language
            </label>
            <select className="w-full border rounded-lg px-3 py-2 text-sm text-gray-700">
              <option>English</option>
              <option>Tamil</option>
              <option>Hindi</option>
            </select>
          </div>
        </div>

        <div className="bg-white shadow rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Security</h2>
          <TextInput label="Admin Email" placeholder="Enter admin email" />
          <TextInput label="Change Password" placeholder="Enter new password" />
        </div>
      </div>
    </PageLayout>
  );
};

export default Settings;
