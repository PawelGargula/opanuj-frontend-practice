import { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: number;
  name: string;
}

const API_URL = '/api/data/users?timeout=10000';

export function useUsersClient() {  
    const [users, setUsers] = useState<User[]>([]);
    const [isTimeoutError, setIsTimeoutError] = useState(false);
    
    function fetchUsers() {
        axios
            .get<User[]>(API_URL, { timeout: 5000 })
            .then((response) => setUsers(response.data))
            .catch((error) => {
                if (error.code === 'ECONNABORTED') {
                    setIsTimeoutError(true);
                } else if (!axios.isCancel(error)) {
                    console.error(error);
                }
            });
    }

    useEffect(() => {
        fetchUsers();
    }, []);
    
    function retryRequest() {
        setIsTimeoutError(false);
        fetchUsers();
    }
    
    return { users, isTimeoutError, retryRequest };
}