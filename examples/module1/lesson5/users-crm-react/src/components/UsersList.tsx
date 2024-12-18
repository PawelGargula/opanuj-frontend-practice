import { getStatusColor } from '../utils/statusColors';
import { useUsers } from '../hooks/use-users';
import { useMutationState } from '@tanstack/react-query';
import type { User } from '../model/User';

const UsersList = () => {
  const { isPending: loading, error, data: users } = useUsers();
  
  const variables = useMutationState<User>({
    filters: { mutationKey: ['addUser'], status: 'pending' },
    select: (mutation) => mutation.state.variables as User,
  });

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid gap-4" data-testid="users-list">
      {users.map((user) => (
        <div
          key={user.id}
          data-testid="user-item"
          className="bg-white rounded-lg shadow p-4 flex justify-between items-center"
        >
          <div className="flex flex-row justify-between items-center w-full">
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <span
              className={`px-2 py-1 rounded-lg text-sm font-medium ${getStatusColor(
                user.status
              )}`}
            >
              {user.status}
            </span>
          </div>
        </div>
      ))}
      {variables.map((user) => (
        <div
          key={user.id}
          data-testid="user-item"
          className="bg-white rounded-lg shadow p-4 flex justify-between items-center opacity-50"
        >
          <div className="flex flex-row justify-between items-center w-full">
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <span
              className={`px-2 py-1 rounded-lg text-sm font-medium ${getStatusColor(
                user.status
              )}`}
            >
              {user.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersList;
