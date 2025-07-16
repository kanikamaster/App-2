import { useState } from 'react'
import './App.css'
import Item from './customer-item';

function App() {
  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem('members');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'へのへの もへじ', count: 0 },
      { id: 2, name: 'へのへの もへじ', count: 0 },
    ];
  });

  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');


  const saveToStorage = (updatedMembers) => {
    setMembers(updatedMembers);
    localStorage.setItem('members', JSON.stringify(updatedMembers));
  };

  const handleAddMember = () => {
    if (newName.trim() === '') return;
    const newMember = {
      id: members.length + 1,
      name: newName.trim(),
      count: 0,
    };
    saveToStorage([...members, newMember]);
    setNewName('');
    setShowForm(false);
  };

  const handleVisit = (id) => {
    const updatedMembers = members.map(member =>
      member.id === id ? { ...member, count: member.count + 1 } : member
    );
    saveToStorage(updatedMembers);
  };  
  
  const filteredMembers = members.filter((member) =>
      member.name.includes(searchQuery)
      );

  const handleDeleteMember = (id) => {
    const updatedMembers = members.filter(member => member.id !== id);
    saveToStorage(updatedMembers);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>来店数カウンター</h1>
        <div className="header-buttons">
          <button onClick={() => setShowSearch(!showSearch)}>会員検索</button>
          <button onClick={() => setShowForm(!showForm)}>新規会員登録</button>
        </div>
      </header>

      {showForm && (
        <div className="new-member-form">
          <input
            type="text"
            placeholder="会員名を入力"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button onClick={handleAddMember} className='come'>追加</button>
        </div>
      )}

      {showSearch && (
        <div className="search-form">
          <input
            type="text"
            placeholder="会員名で検索"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}

      <main className="main-content">
        {filteredMembers.map((member) => (
          <Item
            key={member.id}
            id={member.id}
            name={member.name}
            count={member.count}
            onVisit={handleVisit}
            onDelete={handleDeleteMember}
          />
        ))}
      </main>
    </div>
  );
}

export default App;