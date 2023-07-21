import {
	StyleSheet,
	Text,
	View,
	FlatList,
	TextInput,
	TouchableOpacity,
} from 'react-native';
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
const Item = ({item}: {item: any}) => {
	return item.id !== 2 ? (
		<View style={styles.items}>
			<Text style={styles.itemText}>{item.name}</Text>
		</View>
	) : (
		<View style={[styles.items, {backgroundColor: '#EEEFF0', borderWidth: 0}]}>
			<Text style={styles.itemText}>{item.name}</Text>
		</View>
	);
};
export default function AddNewTaskScreen({navigation}: {navigation: any}) {
	return (
		<View style={styles.container}>
			<Text style={styles.todoTaskText}>Add New Task</Text>

			<View style={styles.des}>
				<Text style={styles.text}>Describe the task</Text>
				<TextInput placeholder="Type here..." style={styles.textInput} />
			</View>
			<View style={styles.des}>
				<Text style={styles.text}>Type</Text>
				{/* <TextInput placeholder="Type here..." style={styles.textInput} /> */}
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
			</View>
			{/* deadline  */}
			<View style={styles.deadline}>
				<Text style={styles.text}>Deadline</Text>
				<TextInput placeholder="Type here..." style={styles.textInputDealine}>
					<Ionicons name="calendar" size={20} color={'#707070'} />
					{/* <Text >Due Date</Text> */}
				</TextInput>
			</View>

			{/* button  */}
			<TouchableOpacity
				style={{
					marginTop: 60,
					borderRadius: 10,
					height: 46,
					backgroundColor: '#5551FF',
					width: 320,
					justifyContent: 'center',
				}}
				onPress={() => {
					navigation.navigate('Home');
				}}>
				<Text
					style={{
						fontSize: 15,
						fontWeight: '700',
						lineHeight: 20,
						letterSpacing: -0.24,
						textAlign: 'center',
						color: '#fff',
					}}>
					Add the task
				</Text>
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
	todoTaskText: {
		fontFamily: 'Roboto-Regular',
		fontWeight: '300',
		fontSize: 24,
		lineHeight: 28.13,
		color: '#403572',
		marginTop: 40,
		marginLeft: -170,
	},
	des: {
		marginTop: 40,
		height: 60,
		width: 320,
	},
	text: {
		fontWeight: '500',
		fontSize: 12,
		lineHeight: 17,
		letterSpacing: 0.21,
		color: '#173147',
	},
	textInput: {
		fontWeight: '400',
		fontSize: 12,
		letterSpacing: 0.21,
		lineHeight: 17,
		color: '#707070',
		marginTop: 10,
		borderWidth: 1,
		borderColor: '#173147',
		borderRadius: 10,
		paddingHorizontal: 15,
	},
	items: {
		width: 94.87,
		height: 37,
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
	tasks: {
		marginTop: 12,
	},
	deadline: {
		marginTop: 35,
		height: 60,
		width: 320,
		borderColor: '#173147',
	},
	textInputDealine: {
		fontWeight: '400',
		fontSize: 12,
		letterSpacing: 0.21,
		lineHeight: 17,
		color: '#707070',
		marginTop: 15,
		borderWidth: 1,
		borderColor: '#173147',
		borderRadius: 10,
		paddingHorizontal: 15,
		// paddingVertical:20,
		// flex:1
	},
});
