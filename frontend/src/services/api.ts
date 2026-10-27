import { TimeCapsuleResponse, CompareResponse, LifeStats } from '../types';

const API_BASE = (import.meta as any).env?.VITE_API_URL || '/api';

export async function fetchTimeCapsule(
  date: string,
  name: string = 'Time Traveler',
  country: string = 'Worldwide'
): Promise<TimeCapsuleResponse> {
  const params = new URLSearchParams({
    date,
    name: name.trim() || 'Time Traveler',
    country
  });

  const res = await fetch(`${API_BASE}/capsule?${params.toString()}`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Failed to assemble your time capsule.');
  }
  return res.json();
}

export async function fetchLifeStats(
  date: string,
  country: string = 'Worldwide'
): Promise<LifeStats> {
  const params = new URLSearchParams({ date, country });
  const res = await fetch(`${API_BASE}/stats?${params.toString()}`);
  if (!res.ok) {
    throw new Error('Failed to compute life stats.');
  }
  return res.json();
}

export async function fetchCompare(
  date1: string,
  date2: string,
  name1: string = 'Person 1',
  name2: string = 'Person 2'
): Promise<CompareResponse> {
  const params = new URLSearchParams({
    date1,
    date2,
    name1: name1.trim() || 'Person 1',
    name2: name2.trim() || 'Person 2'
  });

  const res = await fetch(`${API_BASE}/compare?${params.toString()}`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Failed to compare timelines.');
  }
  return res.json();
}

export async function regenerateStory(payload: any): Promise<string> {
  const res = await fetch(`${API_BASE}/story`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    throw new Error('Failed to generate story.');
  }
  const data = await res.json();
  return data.story;
}
