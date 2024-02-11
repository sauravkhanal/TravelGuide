import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Pressable, Image, Switch } from 'react-native';
import COLORS from '../../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import getLocalImage from '../../../componentsSaurav/getImage/getLocalImage';



export default function ContributeScreen() {

	const [name, setName] = useState('');
	const [coordinates, setCoordinates] = useState('');
	const [hasTicket, setHasTicket] = useState(false);
	const [ticketPrice, setTicketPrice] = useState('');
	const [description, setDescription] = useState('');
	const [imageUri, setImageUri] = useState(null);
	const [errors, setErrors] = useState({})

	const validateForm = () => {
		let errors = {}
		if (!name) errors.name = "Name is required"
		if (!coordinates) errors.coordinates = "Location is required"
		if (!imageUri) errors.image = "Image is required"
		if (hasTicket && !ticketPrice) errors.ticketPrice = "Ticket Price is required"

		setErrors(errors)

		return Object.keys(errors).length === 0; //true if no error messages
	}

	const resetForm = () => {
		setName('');
		setCoordinates('');
		setHasTicket(false);
		setTicketPrice('');
		setDescription('');
		setImageUri(null);
		setErrors({});
	};

	const handleSubmit = () => {

		if (validateForm()) {
			// You can perform any actions with the input values here
			console.log('Name:', name);
			console.log('Coordinates:', coordinates);
			console.log('Has Ticket:', hasTicket);
			console.log('Has Ticket:', ticketPrice);
			console.log('Description:', description);
			console.log('image:', imageUri);
			resetForm();
		}
	};

	async function handleAddImage() {
		const image = await getLocalImage();
		if (image) {
			setImageUri(image)
		}
	}

	function clearImage() {
		setImageUri(null)
	}

	function toggleTicket() {
		setHasTicket(v => !v)
	}
	return (
		<ScrollView style={styles.container}>

			<Pressable
				onPress={handleAddImage}
				style={[styles.imageContainer, errors?.image && { borderColor: 'red' }]}
				android_ripple={{
					foreground: true,
					radius: 500,
					color: "rgba(0,0,0,0.1)",
					borderless: false,
				}}
			>
				{imageUri ? (<>
					<Image source={{ uri: imageUri }} style={styles.image} />
					<Pressable style={styles.imageIcon}
						android_ripple={{
							foreground: true,
							radius: 500,
							color: "rgba(255,255,255,0.5)",
							borderless: false,
						}}
						onPress={clearImage}
					>
						<Icon name='cancel' size={30} />
					</Pressable>

				</>
				) : (
					<View style={styles.placeholder}>
						{/* Placeholder content */}
						<Icon name='add-a-photo' size={50} />
						<Text>Add an image</Text>
					</View>
				)}
			</Pressable>
				{errors?.image && <Text style={[styles.headingText, styles.errorText]}>{errors.image}</Text>}

			<View style={styles.collection}>
				<Text style={styles.headingText}>Name</Text>
				<TextInput
					placeholder='Name of the place'
					style={[styles.inputField, errors?.name && { borderColor: COLORS.error }]}
					value={name}
					onChangeText={text => setName(text)}
				/>
			</View>

			{errors?.name && <Text style={[styles.headingText, styles.errorText]}>{errors.name}</Text>}

			<View style={styles.collection}>
				<Text style={styles.headingText}>Location</Text>
				<TextInput
					placeholder='location of the site'
					style={[styles.inputField, errors?.coordinates && { borderColor: COLORS.error }]}
					value={coordinates}
					onChangeText={text => setCoordinates(text)}
				/>
			</View>

			{errors?.coordinates && <Text style={[styles.headingText, styles.errorText]}>{errors.coordinates}</Text>}


			<View style={[styles.collection, styles.ticketContainer]}>
				<Switch
					value={hasTicket}
					onChange={toggleTicket}
				/>
				<Text style={styles.text}>Needs Ticket?</Text>
			</View>

			{hasTicket &&
				<>
					<View style={styles.collection}>
						<Text style={styles.headingText}>Ticket Price</Text>
						<TextInput
							placeholder='Ticket Price'
							style={[styles.inputField, errors?.ticketPrice && { borderColor: COLORS.error }]}
							value={ticketPrice}
							onChangeText={text => setTicketPrice(text)}
							keyboardType='numeric'
						/>
					</View>
					{errors?.ticketPrice && <Text style={[styles.headingText, styles.errorText]}>{errors.ticketPrice}</Text>}
				</>
			}


			<View style={styles.collection}>
				<Text style={styles.headingText}>Description</Text>
				<TextInput
					placeholder='Description'
					style={[styles.inputField, styles.description]}
					multiline
					numberOfLines={4}
					value={description}
					onChangeText={text => setDescription(text)}
				/>
			</View>

			<View style={styles.collection}>
				<Pressable
					style={styles.btn}
					onPress={handleSubmit}
					android_ripple={{
						foreground: true,
						radius: 500,
						color: "rgba(255,255,255,0.2)",
						borderless: false,
					}}>
					<Text style={styles.btnTxt}>Contribute</Text>
				</Pressable>
			</View>

		</ScrollView>
	);
};


const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 15,
	},
	collection: {
		marginTop: 20
	},
	headingText: {
		paddingLeft: 3,
		marginBottom: 3,
		color: "black"
	},
	inputField: {
		borderColor: "black",
		borderWidth: 1.5,
		borderRadius: 6,
		fontSize: 16,
		paddingLeft: 10
	},
	description: {
		verticalAlign: "top"
	},
	btn: {
		backgroundColor: COLORS.primary, // Use your preferred color
		padding: 10,
		alignItems: 'center',
		borderRadius: 5,
	},
	btnTxt: {
		color: COLORS.white,
	},
	imageContainer: {
		marginTop: 20,
		height: 300,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f2f2f2',
		borderWidth: 2,
		borderColor: '#999999',
		borderStyle: 'dotted',
	},
	placeholder: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain',
	},
	imageIcon: {
		position: "absolute",
		top: 5,
		right: 5,
		zIndex: 1
	},
	text: {
		fontSize: 16,
		color: "black"
	},
	ticketContainer: {
		flexDirection: 'row',
		justifyContent: "flex-end"
	},
	errorText: {
		marginTop: 0,
		color: COLORS.error
	}
})


