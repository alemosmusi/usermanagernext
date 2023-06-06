import { useRouter } from 'next/router';

const AdminUserPage = () => {
  const router = useRouter();
  const { email } = router.query;

  return (
    <div>
      <h1>Admin User Page</h1>
      <p>Email: {email}</p>
      {/* Resto del contenido de la página */}
    </div>
  );
};

export default AdminUserPage;