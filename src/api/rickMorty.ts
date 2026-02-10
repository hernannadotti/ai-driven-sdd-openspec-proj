import apiClient from './client';
import type { Character, Location, Episode, PaginatedResponse } from './types';

// Get all characters with optional pagination
export const getCharacters = async (
  page?: number
): Promise<PaginatedResponse<Character>> => {
  try {
    const response = await apiClient.get<PaginatedResponse<Character>>(
      '/character',
      { params: { page } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get a single character by ID
export const getCharacter = async (id: number): Promise<Character> => {
  try {
    const response = await apiClient.get<Character>(`/character/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Alias for consistency with task naming
export const getCharacterById = getCharacter;

// Get all locations with optional pagination
export const getLocations = async (
  page?: number
): Promise<PaginatedResponse<Location>> => {
  try {
    const response = await apiClient.get<PaginatedResponse<Location>>(
      '/location',
      { params: { page } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all episodes with optional pagination
export const getEpisodes = async (
  page?: number
): Promise<PaginatedResponse<Episode>> => {
  try {
    const response = await apiClient.get<PaginatedResponse<Episode>>(
      '/episode',
      { params: { page } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get multiple episodes by IDs (batch fetch)
export const getEpisodesByIds = async (ids: number[]): Promise<Episode[]> => {
  try {
    if (ids.length === 0) {
      return [];
    }
    
    if (ids.length === 1) {
      const response = await apiClient.get<Episode>(`/episode/${ids[0]}`);
      return [response.data];
    }
    
    // API supports comma-separated IDs: /episode/1,2,3
    const idsString = ids.join(',');
    const response = await apiClient.get<Episode[]>(`/episode/${idsString}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

