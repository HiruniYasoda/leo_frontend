import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Trash2, Plus, Minus } from 'lucide-react-native';

const COLORS = {
  black: '#000000',
  white: '#FFFFFF',
  goldMid: '#FFC72C',
  goldDark: '#B8860B',
  darkText: '#000000',
  greyText: '#999999',
  lightGrey: '#F5F5F5',
  borderGrey: '#E0E0E0',
};

export interface CartItem {
  id: string;
  name: string;
  code: string;
  price: number;
  quantity: number;
  imageUri: string;
}

interface CartItemCardProps {
  item: CartItem;
  onQuantityChange: (id: string, change: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItemCard({ item, onQuantityChange, onRemove }: CartItemCardProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.imageUri }} style={styles.image} />

      <View style={styles.detailsContainer}>
        <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.code}>{item.code}</Text>

        <View style={styles.bottomRow}>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>

          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => onQuantityChange(item.id, -1)}
              disabled={item.quantity <= 1}
            >
              <Minus size={16} color={item.quantity <= 1 ? COLORS.greyText : COLORS.darkText} />
            </TouchableOpacity>

            <Text style={styles.quantity}>{item.quantity}</Text>

            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => onQuantityChange(item.id, 1)}
            >
              <Plus size={16} color={COLORS.darkText} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onRemove(item.id)}
      >
        <Trash2 size={20} color={COLORS.greyText} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.borderGrey,
    padding: 12,
    marginBottom: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: COLORS.lightGrey,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.darkText,
    marginBottom: 4,
  },
  code: {
    fontSize: 12,
    color: COLORS.greyText,
    marginBottom: 8,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.darkText,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGrey,
    borderRadius: 20,
    paddingHorizontal: 4,
  },
  quantityButton: {
    padding: 6,
  },
  quantity: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.darkText,
    marginHorizontal: 12,
  },
  deleteButton: {
    padding: 8,
  },
});
