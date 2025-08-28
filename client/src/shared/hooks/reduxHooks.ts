import type { AppDispatch, RootState } from "@/app/redux/store";

import { useDispatch, useSelector } from "react-redux";

// * Создаём кастомный хук для получения диспатча с правильным типом
export const useAppDispatch = useDispatch.withTypes<AppDispatch>() 

// * Создаём кастомный хук для получения селектора с правильным типом
export const useAppSelector = useSelector.withTypes<RootState>()
