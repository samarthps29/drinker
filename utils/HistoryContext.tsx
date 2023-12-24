import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import { HistoryObject } from "../app/(tabs)";

export const HistoryContext = createContext<{
	histArr: HistoryObject[];
	setHistArr: React.Dispatch<React.SetStateAction<HistoryObject[]>>;
} | null>(null);

export const HistoryProvider = ({
	children,
}: React.PropsWithChildren): JSX.Element => {
	const [histArr, setHistArr] = useState<HistoryObject[]>([]);
	const fetchData = async () => {
		const histJsonString = await AsyncStorage.getItem("histArr");
		const histArr: HistoryObject[] = JSON.parse(histJsonString || "[]");
		return histArr;
	};

	useEffect(() => {
		fetchData().then((res) => {
			if (res !== null) {
				setHistArr(res);
			}
		});
	}, []);

	// useEffect(() => {
	// 	(async () => {
	// 		await AsyncStorage.removeItem("histArr");
	// 	})();
	// });

	return (
		<HistoryContext.Provider value={{ histArr, setHistArr }}>
			{children}
		</HistoryContext.Provider>
	);
};
