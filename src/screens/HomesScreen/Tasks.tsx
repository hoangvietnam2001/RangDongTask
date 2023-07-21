import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
const data1 = [
	{
		id: 1,
		name: 'Quick Task',
	},
	{
		id: 2,
		name: 'Urgent',
	},
	{
		id: 3,
		name: 'Important',
	},
	{
		id: 4,
		name: 'Business',
	},
];

const data2 = [
	{
		id: 1,
		name: 'Follow Oluwafisayomi.dev on Twitter.',
		status: false,
	},
	{
		id: 2,
		name: 'Learn Figma by 4pm.',
		status: false,
	},
	{
		id: 3,
		name: 'Coding at 9am.',
		status: false,
	},
	{
		id: 4,
		name: 'Watch Mr Beasts Videos.',
		status: false,
	},
	{
		id: 5,
		name: 'Define my morning routine',
		status: true,
	},
];

const Item = ({item}: {item: any}) => {
	return item.id !== 2 ? (
		<View style={styles.items}>
			<Text style={styles.itemText}>{item.name}</Text>
		</View>
	) : (
		<View style={[styles.items,{backgroundColor:'#EEEFF0',borderWidth:0}]}>
			<Text style={styles.itemText}>{item.name}</Text>
		</View>
	);
};

export default function Tasks({navigation}: {navigation: any}) {
	return (
		<View style={styles.container}>
			{/* todo Task  */}
			<View style={styles.todoTask}>
				<Text style={styles.todoTaskText}>To do Tasks:</Text>

				{/* Task  */}
				<View style={styles.tasks}>
					<FlatList
						data={data1}
						renderItem={({item}) => {
							return <Item item={item} />;
						}}
						keyExtractor={item => item.id.toString()}
						horizontal
					/>
				</View>

				{/* Check box tasks  */}
				<View style={styles.checkBoxTask}>
					{data2.map((item, index) => {
						return (
							<View style={styles.checkItem} key={item.id}>
								{item.status === false ? (
									<>
										<Ionicons
											name="square-outline"
											color={'#403572'}
											size={25}
										/>
										<Text style={styles.textItem}>{item.name}</Text>
									</>
								) : (
									<>
										<Ionicons name="square" color={'#403572'} size={25} />
										<Text
											style={[
												styles.textItem,
												{
													textDecorationLine: 'line-through',
													textDecorationColor: '#403572',
												},
											]}>
											{item.name}
										</Text>
									</>
								)}
							</View>
						);
					})}
				</View>

				{/* button Add  */}
				{/* <View style={styles.btn}> */}
				<TouchableOpacity
					style={styles.btnAdd}
					onPress={() => {
						navigation.navigate('AddNewTask');
					}}>
					<Text style={styles.textBtnAdd}>+</Text>
				</TouchableOpacity>
				{/* </View> */}
			</View>
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
		width: 330,
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
		bottom: -284,
		left: 283,
	},
	textBtnAdd: {
		color: '#fff',
		fontSize: 28,
		fontWeight: '400',
	},
});
