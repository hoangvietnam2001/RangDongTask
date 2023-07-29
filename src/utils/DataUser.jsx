import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import filestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/app';

export default function DataUser() {
	const [data, setData] = useState([]);

	useEffect(() => {
		fetchDataFromFirestore();
	}, []); 

	const fetchDataFromFirestore = async () => {
		try {
			// Truy vấn dữ liệu từ Firestore collection
			const querySnapshot = await filestore().collection('user').get();

			// chuyen doi querySnapshot thanh mang du lieu
			const resultData = querySnapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data(),
			}));

			//cap nhat state
			setData(resultData);
		} catch (error) {
			console.log('Error fetching data:', error);
		}
	};
    console.log(data.map(item=>item.lastName));
	return (
		<View>
			{data.map(item => {
				<Text key={item.id}>
					{item.firstName} - {item.lastName}
				</Text>;
			})}
		</View>
	);
}
