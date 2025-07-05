import Navbar from '../components/Navbar';
import ActorForm from '../components/ActorForm';
import ActorList from '../components/ActorList';
import { useState } from 'react';

function ActorPage() {
  const [refresh, setRefresh] = useState(false);
  const handleRefresh = () => setRefresh(!refresh);

  return (
    <div>
      <Navbar />
      <main style={{ padding: '2rem' }}>
        <ActorForm onCreated={handleRefresh} />
        <ActorList refresh={refresh} />
      </main>
    </div>
  );
}

export default ActorPage;
