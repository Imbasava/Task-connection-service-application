import React from 'react';

function ServiceAdded() {
  return (
    <div className="container mx-auto p-6">
      <header className="bg-indigo-600 text-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold">Service Added!</h1>
        <p className="mt-2 text-lg">You have successfully registered as a Plumbing Tasker.</p>
      </header>
      <section className="my-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Service Successfully Added!</h2>
          <p className="text-gray-600">Your plumbing services are now visible to customers.</p>
        </div>
      </section>
    </div>
  );
}

export default ServiceAdded;
