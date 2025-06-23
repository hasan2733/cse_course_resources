import React from 'react';

const ResourceCard = ({ resource, isAdmin, editResource, deleteResource }) => {
  return (
    <div className="resource-card">
      <div className="resource-header">
        <span className="course-code">{resource.courseCode}</span>
        <span className={`resource-type ${resource.resourceType}`}>
          {resource.resourceType}
        </span>
      </div>
      <h3>{resource.courseName}</h3>
      <p>{resource.description || 'No description provided.'}</p>
      
      <div className="student-details">
        <p><strong>Shared by:</strong> {resource.studentName}</p>
        <p><strong>ID:</strong> {resource.studentId}</p>
        <p><strong>Email:</strong> {resource.email}</p>
      </div>
      
      <a 
        href={resource.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="resource-link"
      >
        {resource.resourceType === 'youtube' 
          ? 'Watch Tutorial' 
          : resource.resourceType === 'notes' 
            ? 'View Notes' 
            : 'View Slides'}
      </a>
      
      {isAdmin && (
        <div className="admin-controls">
          <button 
            className="edit-btn"
            onClick={() => editResource(resource)}
          >
            Edit
          </button>
          <button 
            className="delete-btn"
            onClick={() => deleteResource(resource.id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ResourceCard;