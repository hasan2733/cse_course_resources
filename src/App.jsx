import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ResourceForm from './components/ResourceForm';
import ResourceList from './components/ResourceList';
import Footer from './components/Footer';
import MessageBanner from './components/MessageBanner';
import './App.css';

const RESOURCE_KEY = 'course_resources';

function App() {
  const [resources, setResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [newResource, setNewResource] = useState({
    courseCode: '',
    courseName: '',
    resourceType: 'notes',
    url: '',
    description: '',
    studentName: '',
    studentId: '',
    email: ''
  });
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'true') {
      setIsDarkMode(true);
    }
    loadResources();
  }, []);
  
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);
  
  const loadResources = () => {
    setIsLoading(true);
    const savedResources = localStorage.getItem(RESOURCE_KEY);
    if (savedResources) {
      setResources(JSON.parse(savedResources));
    }
    setIsLoading(false);
  };
  
  const saveResources = (resourcesToSave) => {
    localStorage.setItem(RESOURCE_KEY, JSON.stringify(resourcesToSave));
    setResources(resourcesToSave);
  };
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  const toggleAdminLogin = () => {
    setShowAdminLogin(!showAdminLogin);
  };
  
  const handleAdminLogin = () => {
    if (adminPassword === 'admin123') {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setMessage('Admin mode activated!');
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage('Incorrect password');
      setTimeout(() => setMessage(''), 3000);
    }
    setAdminPassword('');
  };
  
  const handleAdminLogout = () => {
    setIsAdmin(false);
    setMessage('Admin mode deactivated');
    setTimeout(() => setMessage(''), 3000);
  };
  
  const showMessage = (msg) => {
    setMessage(msg);
  };
  
  const validateStudentId = (id) => {
    if (id.length <= 13 && /^\d*$/.test(id)) {
      setNewResource({
        ...newResource,
        studentId: id,
        email: id.length === 13 ? `${id}@seu.edu.bd` : ''
      });
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'studentId') {
      validateStudentId(value);
    } else {
      setNewResource({
        ...newResource,
        [name]: value
      });
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const resourceData = {
      id: editingResource ? editingResource.id : Date.now(),
      ...newResource,
      email: newResource.studentId.length === 13 ? `${newResource.studentId}@seu.edu.bd` : ''
    };
    
    if (editingResource) {
      const updatedResources = resources.map(resource => 
        resource.id === editingResource.id ? resourceData : resource
      );
      saveResources(updatedResources);
      showMessage('Resource updated successfully!');
      cancelEdit();
    } else {
      const updatedResources = [...resources, resourceData];
      saveResources(updatedResources);
      showMessage('Resource added successfully!');
      setNewResource({
        courseCode: '',
        courseName: '',
        resourceType: 'notes',
        url: '',
        description: '',
        studentName: '',
        studentId: '',
        email: ''
      });
    }
  };
  
  const cancelEdit = () => {
    setEditingResource(null);
    setNewResource({
      courseCode: '',
      courseName: '',
      resourceType: 'notes',
      url: '',
      description: '',
      studentName: '',
      studentId: '',
      email: ''
    });
    showMessage('Edit canceled');
  };
  
  const editResource = (resource) => {
    setEditingResource(resource);
    setNewResource({
      courseCode: resource.courseCode,
      courseName: resource.courseName,
      resourceType: resource.resourceType,
      url: resource.url,
      description: resource.description,
      studentName: resource.studentName,
      studentId: resource.studentId,
      email: resource.email
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const deleteResource = (id) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      const updatedResources = resources.filter(resource => resource.id !== id);
      saveResources(updatedResources);
      showMessage('Resource deleted successfully!');
    }
  };
  
  const exportData = () => {
    const dataStr = JSON.stringify(resources);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'course_resources.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    document.body.appendChild(linkElement);
    
    linkElement.click();
    document.body.removeChild(linkElement);
    
    showMessage('Data exported successfully!');
  };
  
  const importData = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        if (Array.isArray(importedData)) {
          saveResources(importedData);
          showMessage('Data imported successfully!');
        } else {
          showMessage('Invalid data format');
        }
      } catch (error) {
        showMessage('Error importing data: ' + error.message);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };
  
  const filteredResources = resources.filter(resource => {
    const term = searchTerm.toLowerCase();
    return (
      resource.courseCode.toLowerCase().includes(term) ||
      resource.courseName.toLowerCase().includes(term) ||
      resource.studentId.includes(term)
    );
  });
  
  return (
    <div className="app">
      <Header 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
        toggleAdminLogin={toggleAdminLogin}
        isAdmin={isAdmin}
        showAdminLogin={showAdminLogin}
        adminPassword={adminPassword}
        setAdminPassword={setAdminPassword}
        handleAdminLogin={handleAdminLogin}
        handleAdminLogout={handleAdminLogout}
      />

      {message && <MessageBanner message={message} />}

      <main>
        <ResourceForm 
          editingResource={editingResource}
          newResource={newResource}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          cancelEdit={cancelEdit}
          isAdmin={isAdmin}
          exportData={exportData}
          importData={importData}
        />
        <ResourceList 
          filteredResources={filteredResources}
          isLoading={isLoading}
          isAdmin={isAdmin}
          editResource={editResource}
          deleteResource={deleteResource}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;