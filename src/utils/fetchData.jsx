import firestore from '@react-native-firebase/firestore';

// truy van dư lieu tu firestore
export const fetchData = async name => {
	try {
		const querySnapshot = await firestore().collection(name).get();

		const documents = [];
		querySnapshot.forEach(documentSnapshot => {
			documents.push(documentSnapshot.data());
		});

		return documents;
	} catch (error) {
		console.log('Error query data:', error);
		return [];
	}
};
