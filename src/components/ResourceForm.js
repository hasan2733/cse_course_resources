import React from 'react';

const ResourceForm = ({
  editingResource,
  newResource,
  handleInputChange,
  handleSubmit,
  isLoading,
  cancelEdit,
  isAdmin,
  exportData,
  importData
}) => {
  return (
    <section className="resource-form">
      <h2>{editingResource ? 'Edit Resource' : 'Add New Resource'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Course Code: *</label>
          <input
            type="text"
            name="courseCode"
            value={newResource.courseCode}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Course Name: *</label>
          <input
            type="text"
            name="courseName"
            value={newResource.courseName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Resource Type: *</label>
          <select
            name="resourceType"
            value={newResource.resourceType}
            onChange={handleInputChange}
          >
            <option value="notes">Notes</option>
            <option value="youtube">YouTube Tutorial</option>
            <option value="slides">Slides</option>
          </select>
        </div>
        <div className="form-group">
          <label>URL: *</label>
          <input
            type="url"
            name="url"
            value={newResource.url}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={newResource.description}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="student-info">
          <h3>Student Information</h3>
          <div className="form-group">
            <label>Student Name: *</label>
            <input
              type="text"
              name="studentName"
              value={newResource.studentName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Student ID (13 digits): *</label>
            <input
              type="text"
              name="studentId"
              value={newResource.studentId}
              onChange={handleInputChange}
              maxLength={13}
              required
            />
          </div>
          <div className="form-group">
            <label>SEU Email:</label>
            <input
              type="text"
              value={newResource.email}
              readOnly
              className="email-display"
            />
          </div>
        </div>
        
        <div className="form-buttons">
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : (editingResource ? 'Update Resource' : 'Add Resource')}
          </button>
          {editingResource && (
            <button type="button" className="cancel-button" onClick={cancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>
      
      {isAdmin && (
        <div className="data-actions">
          <h3>Data Management</h3>
          <button onClick={exportData} className="export-btn">
            Export All Data
          </button>
          <div className="import-container">
            <label htmlFor="import-file">Import Data:</label>
            <input 
              type="file" 
              id="import-file" 
              accept=".json" 
              onChange={importData}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default ResourceForm;