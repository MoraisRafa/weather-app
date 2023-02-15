import { ActivityIndicator, View, StyleSheet } from 'react-native';

export function Loading() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#fff" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a0a0a',
        alignItems: 'center',
        justifyContent: 'center',
    },
})