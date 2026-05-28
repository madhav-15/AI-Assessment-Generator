const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export async function createAssignment(data: any) {
  const res = await fetch(`${API_URL}/assignments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to create assignment');
  }
  
  return res.json();
}

export async function getAssignments() {
  const res = await fetch(`${API_URL}/assignments`);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to fetch assignments');
  }
  return res.json();
}

export async function deleteAssignment(id: string) {
  const res = await fetch(`${API_URL}/assignments/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to delete assignment');
  }
  return res.json();
}

export async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${API_URL}/assignments/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to upload file');
  }

  return res.json();
}

export async function getResult(assignmentId: string) {
  const res = await fetch(`${API_URL}/results/${assignmentId}`);
  
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to fetch result');
  }
  
  return res.json();
}

export function getPdfUrl(assignmentId: string) {
  return `${API_URL}/results/${assignmentId}/pdf`;
}
