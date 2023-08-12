'use strict';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	FlatList,
	Alert,
	Dimensions,
	ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import categories from '../../../utils/categories';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function Tasks({navigation}: {navigation: any}) {
	const U_ID = auth().currentUser?.uid;

	const [data, setData] = useState([]);
	const [nameTask, setNameTask] = useState(categories[0].name);
	const [isActive, setIsActive] = useState(categories[0].id);

	useEffect(() => {
		const query = firestore()
			.collection('Task')
			.where('userId', '==', U_ID)
			.onSnapshot(querySnapshot => {
				const updatedTodos = querySnapshot.docs.map(doc => doc.data());
				setData(updatedTodos);
			});
		return () => query();
	}, [U_ID]);

	// console.log('Data',firestore().collection('Task').doc());

	const showToast = () => {
		ToastAndroid.showWithGravity(
			'Xóa thành công !!',
			ToastAndroid.SHORT,
			ToastAndroid.CENTER,
		);
	};

	const handleToggleStatus = (des: any) => {
		const updatedTodoList = data.map((item: any) => {
			return item.description === des ? {...item, status: !item.status} : item;
		});
		setData(updatedTodoList);
	};

	// active with category
	const handleToggleCheck = (itemId: any) => {
		setIsActive(itemId);
	};

	// filter with nameTask
	const dataOfCategory = data.filter(item => {
		return item.category == nameTask;
	});

	// console.log('Data Sub',dataOfCategory);

	// update
	const update = async (
		collectionName,
		conditionField,
		conditionOperator,
		conditionValue,
		updateData,
	) => {
		try {
			// Lấy danh sách các tài liệu thỏa mãn điều kiện
			const querySnapshot = await firestore()
				.collection(collectionName)
				.where(conditionField, conditionOperator, conditionValue)
				.get();

			// Batch update để cập nhật các tài liệu
			const batch = firestore().batch();

			querySnapshot.forEach(documentSnapshot => {
				const documentRef = firestore()
					.collection(collectionName)
					.doc(documentSnapshot.id);
				batch.update(documentRef, updateData);
			});

			await batch.commit();
			console.log('Cập nhật các tài liệu thành công thỏa mãn điều kiện.');
		} catch (error) {
			console.log('Lỗi khi cập nhật các tài liệu:', error);
		}
	};

	// delete
	const deleteTask = async (
		collectionName,
		conditionField,
		conditionOperator,
		conditionValue,
	) => {
		try {
			// Lấy danh sách các tài liệu thỏa mãn điều kiện
			const querySnapshot = await firestore()
				.collection(collectionName)
				.where(conditionField, conditionOperator, conditionValue)
				.get();

			// Batch update để xóa các tài liệu
			const batch = firestore().batch();

			querySnapshot.forEach(documentSnapshot => {
				const documentRef = firestore()
					.collection(collectionName)
					.doc(documentSnapshot.id);
				batch.delete(documentRef);
			});
			await batch.commit();
			// Alert.alert('Deleted Successfully');
			showToast();
			console.log('Xóa các tài liệu thành công thỏa mãn điều kiện.');
		} catch (error) {
			console.log('Lỗi khi xóa các tài liệu:', error);
		}
	};

	const handleDele = (
		collectionName,
		conditionField,
		conditionOperator,
		conditionValue,
	) => {
		Alert.alert(
			'Delete Item',
			'Do you want to delete this item ?',
			[
				{
					text: 'Cancel',
					style: 'cancel',
				},
				{
					text: 'Ok',
					onPress: () => {
						deleteTask(
							collectionName,
							conditionField,
							conditionOperator,
							conditionValue,
						);
					},
				},
			],
			{cancelable: false},
			// Không cho phép người dùng nhấn bất kỳ nút nào khác ngoài OK hoặc Cancel để đóng alert
		);
	};
	// update('Task', 'description', '==', 'Cooking', {status: true});
	//  deleteTask('Task','description','==','Smiling with monkey');

	const Item = ({item}: {item: any}) => {
		return (
			<TouchableOpacity
				onPress={() => {
					// console.log(item.name);
					handleToggleCheck(item.id);
					setNameTask(item.name);
				}}
				style={[
					styles.items,
					{
						backgroundColor: isActive === item.id ? '#EEEFF0' : '#fff',
						borderWidth: isActive === item.id ? 0 : 1,
					},
				]}>
				<Text style={styles.itemText}>{item.name}</Text>
			</TouchableOpacity>
		);
	};

	return (
		<View style={styles.container}>
			{/* todo Task  */}
			<View style={styles.todoTask}>
				<Text style={styles.todoTaskText}>To do Tasks:</Text>

				{/* Task  */}
				<View style={styles.tasks}>
					<FlatList
						data={categories}
						renderItem={Item}
						keyExtractor={item => item.id.toString()}
						horizontal
						showsHorizontalScrollIndicator={false}
					/>
				</View>

				{/* Check box tasks  */}
				<View style={styles.checkBoxTask}>
					{dataOfCategory.map((item, index) => {
						return (
							<View key={index}>
								<View
									style={styles.checkItem}
									// onPress={() => handleToggleStatus(item.deadline)}
								>
									<Ionicons
										name={item.status ? 'checkbox-outline' : 'square-outline'}
										color={'#403572'}
										size={25}
										onPress={() => {
											// setIsAvtiveItem(item.description);
											handleToggleStatus(item.description);

											update('Task', 'description', '==', item.description, {
												status: !item.status,
											});
										}}
									/>
									<Text
										style={[
											styles.textItem,
											{
												textDecorationLine: item.status
													? 'line-through'
													: 'none',
												textDecorationColor: item.status ? '#403572' : '#fff',
											},
										]}>
										{item.description}
									</Text>
									<Text style={{color:'#000',fontSize:12,position:'absolute',right:30}}>
										{item.deadline}
									</Text>
									<Ionicons
										style={{position: 'absolute', right: 0}}
										name="close"
										size={24}
										color={'#403572'}
										onPress={() =>
											handleDele('Task', 'description', '==', item.description)
										}
									/>
								</View>
							</View>
						);
					})}
				</View>
			</View>
			<TouchableOpacity
				style={styles.btnAdd}
				onPress={() => {
					navigation.navigate('AddNewTask');
				}}>
				<Text style={styles.textBtnAdd}>+</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	todoTask: {
		width: 320,
		height: 200,
		marginTop: 40,
		borderRadius: 15,
	},
	todoTaskText: {
		fontFamily: 'Roboto-Regular',
		fontWeight: '300',
		fontSize: 24,
		lineHeight: 28.13,
		color: '#403572',
		marginTop: 5,
	},
	tasks: {
		marginTop: 20,
		// flexDirection:'row'
	},
	items: {
		width: 94.87,
		height: 37,
		marginTop: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#4681A3',
		marginRight: 10,
		borderRadius: 10,
	},
	itemText: {
		fontWeight: '600',
		fontSize: 12,
		lineHeight: 14.52,
		color: '#4681A3',
		letterSpacing: -0.1,
	},
	checkBoxTask: {
		width: 330,
		height: 180,
		marginTop: 40,
	},
	checkItem: {
		flexDirection: 'row',
		paddingVertical: 5,
		alignItems: 'center',
	},
	textItem: {
		marginLeft: 15,
		fontWeight: '500',
		fontSize: 13,
		lineHeight: 19.5,
		textAlign: 'center',
		color: '#173147',
	},
	btnAdd: {
		position: 'absolute',
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: '#4681A3',
		justifyContent: 'center',
		alignItems: 'center',
		top: 480,
		right: 40,
	},
	textBtnAdd: {
		color: '#fff',
		fontSize: 28,
		fontWeight: '400',
	},
});
