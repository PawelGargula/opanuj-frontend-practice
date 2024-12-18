import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { User } from "../model/User";

const USERS_QUERY_KEY = ['users'];
const USERS_API = 'http://localhost:3000/api/data/users';


export function useUsers() {
    return useQuery({
        queryKey: [USERS_QUERY_KEY],
        queryFn: async () => {
            try {
                const response = await axios.get<User[]>(USERS_API);
                return response.data;
            } catch (error) {
                throw new Error('Failed to fetch users');
            }
        }
    });
}

export function useAddUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newUser: Pick<User, 'id' | 'name' | 'status'>) => {
            try {
                const response = await axios.post<User>(`${USERS_API}?timeout=3000`, newUser);
                return response.data;
            } catch (error) {
                throw new Error('Failed to add user');
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
        },
        mutationKey: ['addUser'],
    });
}