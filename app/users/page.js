"use client";

import React, { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data.users);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-[#6f1f3f]">User Management</h1>
      <p className="text-sm text-[#6f4f5f]">
        Manage admin/users, roles, and permissions.
      </p>

      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <ul className="space-y-2">
            {users.map((user) => (
              <li key={user.id} className="rounded-lg border px-4 py-3">
                <p className="font-semibold text-[#4f2b3d]">{user.name}</p>
                <p className="text-sm text-[#7e5f73]">{user.role}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
