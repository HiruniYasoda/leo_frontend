import React, { useState } from 'react';
import { router } from 'expo-router';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
    TextInput,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
    black: '#000000',
    white: '#FFFFFF',
    goldMid: '#FFC72C',
    darkText: '#000000',
    greyText: '#666666',
    lightGrey: '#F5F5F5',
    borderGrey: '#E0E0E0',
};

export default function PollCreationScreen() {
    const [pollQuestion, setPollQuestion] = useState('');
    const [pollDescription, setPollDescription] = useState('');
    const [options, setOptions] = useState(['', '']);
    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('');
    const [timeFormat, setTimeFormat] = useState<'am' | 'pm'>('am');

    const handleAddOption = () => {
        setOptions([...options, '']);
    };

    const handleOptionChange = (value: string, index: number) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleRemoveOption = (index: number) => {
        if (options.length > 2) {
            const newOptions = options.filter((_, i) => i !== index);
            setOptions(newOptions);
        }
    };

    const handleDatePicker = () => {
        console.log('Open date picker');
        // TODO: Implement date picker
    };

    const handleTimePicker = () => {
        console.log('Open time picker');
        // TODO: Implement time picker
    };

    const handleCancel = () => {
        router.back();
    };

    const handlePublish = () => {
        console.log('Publishing poll:', {
            pollQuestion,
            pollDescription,
            options,
            endDate,
            endTime,
            timeFormat,
        });
        // TODO: Implement poll creation logic
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.goldMid} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Poll Creation</Text>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    {/* Form Card */}
                    <View style={styles.formCard}>
                        {/* Poll Question */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Poll Question</Text>
                            <TextInput
                                style={styles.input}
                                value={pollQuestion}
                                onChangeText={setPollQuestion}
                                placeholder=""
                                placeholderTextColor={COLORS.greyText}
                            />
                        </View>

                        {/* Poll Description */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Poll Description</Text>
                            <TextInput
                                style={styles.input}
                                value={pollDescription}
                                onChangeText={setPollDescription}
                                placeholder=""
                                placeholderTextColor={COLORS.greyText}
                            />
                        </View>

                        {/* Options */}
                        {options.map((option, index) => (
                            <View key={index} style={styles.inputGroup}>
                                <View style={styles.optionHeader}>
                                    <Text style={styles.inputLabel}>Option {index + 1}</Text>
                                    {options.length > 2 && (
                                        <TouchableOpacity onPress={() => handleRemoveOption(index)}>
                                            <Ionicons name="close-circle" size={20} color={COLORS.greyText} />
                                        </TouchableOpacity>
                                    )}
                                </View>
                                <TextInput
                                    style={styles.input}
                                    value={option}
                                    onChangeText={(value) => handleOptionChange(value, index)}
                                    placeholder=""
                                    placeholderTextColor={COLORS.greyText}
                                />
                            </View>
                        ))}

                        {/* Add More Options */}
                        <TouchableOpacity style={styles.addOptionButton} onPress={handleAddOption}>
                            <Ionicons name="add" size={20} color={COLORS.greyText} />
                            <Text style={styles.addOptionText}>Add More Options</Text>
                        </TouchableOpacity>

                        {/* End Date */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>End Date</Text>
                            <View style={styles.dateInputContainer}>
                                <View style={styles.dateSegments}>
                                    <TextInput
                                        style={styles.dateSegment}
                                        placeholder=""
                                        maxLength={2}
                                        keyboardType="number-pad"
                                    />
                                    <Text style={styles.dateSeparator}>/</Text>
                                    <TextInput
                                        style={styles.dateSegment}
                                        placeholder=""
                                        maxLength={2}
                                        keyboardType="number-pad"
                                    />
                                    <Text style={styles.dateSeparator}>/</Text>
                                    <TextInput
                                        style={styles.dateSegment}
                                        placeholder=""
                                        maxLength={4}
                                        keyboardType="number-pad"
                                    />
                                </View>
                                <TouchableOpacity onPress={handleDatePicker} style={styles.calendarIcon}>
                                    <Ionicons name="calendar-outline" size={24} color={COLORS.darkText} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* End Time */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>End Time</Text>
                            <View style={styles.timeInputContainer}>
                                <View style={styles.timeSegments}>
                                    <TextInput
                                        style={styles.timeSegment}
                                        placeholder=""
                                        maxLength={2}
                                        keyboardType="number-pad"
                                    />
                                    <Text style={styles.timeSeparator}>:</Text>
                                    <TextInput
                                        style={styles.timeSegment}
                                        placeholder=""
                                        maxLength={2}
                                        keyboardType="number-pad"
                                    />
                                </View>
                                <View style={styles.timeFormatContainer}>
                                    <TouchableOpacity
                                        style={[styles.formatButton, timeFormat === 'am' && styles.formatButtonActive]}
                                        onPress={() => setTimeFormat('am')}
                                    >
                                        <Text style={[styles.formatText, timeFormat === 'am' && styles.formatTextActive]}>
                                            am
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.formatButton, timeFormat === 'pm' && styles.formatButtonActive]}
                                        onPress={() => setTimeFormat('pm')}
                                    >
                                        <Text style={[styles.formatText, timeFormat === 'pm' && styles.formatTextActive]}>
                                            pm
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity onPress={handleTimePicker} style={styles.clockIcon}>
                                    <Ionicons name="time-outline" size={24} color={COLORS.darkText} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Action Buttons */}
                        <View style={styles.actionButtons}>
                            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
                                <Text style={styles.publishButtonText}>Publish Poll</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 12,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.darkText,
    },
    scrollView: {
        flex: 1,
    },
    content: {
        padding: 16,
    },
    formCard: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: 24,
        borderWidth: 2,
        borderColor: COLORS.goldMid,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    inputGroup: {
        marginBottom: 24,
    },
    inputLabel: {
        fontSize: 15,
        fontWeight: '500',
        color: COLORS.darkText,
        marginBottom: 8,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.darkText,
        paddingVertical: 8,
        fontSize: 16,
        color: COLORS.darkText,
    },
    optionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    addOptionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        marginBottom: 24,
        gap: 8,
    },
    addOptionText: {
        fontSize: 15,
        color: COLORS.greyText,
    },
    dateInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.darkText,
        paddingBottom: 8,
    },
    dateSegments: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateSegment: {
        fontSize: 16,
        color: COLORS.darkText,
        textAlign: 'center',
        minWidth: 40,
    },
    dateSeparator: {
        fontSize: 16,
        color: COLORS.darkText,
        marginHorizontal: 4,
    },
    calendarIcon: {
        padding: 4,
    },
    timeInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.darkText,
        paddingBottom: 8,
    },
    timeSegments: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 12,
    },
    timeSegment: {
        fontSize: 16,
        color: COLORS.darkText,
        textAlign: 'center',
        minWidth: 30,
    },
    timeSeparator: {
        fontSize: 16,
        color: COLORS.darkText,
        marginHorizontal: 4,
    },
    timeFormatContainer: {
        flexDirection: 'row',
        gap: 8,
        flex: 1,
    },
    formatButton: {
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
    formatButtonActive: {
        backgroundColor: 'transparent',
    },
    formatText: {
        fontSize: 14,
        color: COLORS.greyText,
    },
    formatTextActive: {
        color: COLORS.darkText,
        fontWeight: '600',
    },
    clockIcon: {
        padding: 4,
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 16,
        marginTop: 16,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: COLORS.black,
        borderRadius: 24,
        paddingVertical: 14,
        alignItems: 'center',
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.white,
    },
    publishButton: {
        flex: 1,
        backgroundColor: COLORS.goldMid,
        borderRadius: 24,
        paddingVertical: 14,
        alignItems: 'center',
    },
    publishButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.darkText,
    },
});
