import { UPDATE_CONFIG } from '@/config/actionTypes'
import { configState } from '@/types/reducer'

export const updateConfig = (payload: configState) => {
  return {
    type: UPDATE_CONFIG,
    payload
  }
}