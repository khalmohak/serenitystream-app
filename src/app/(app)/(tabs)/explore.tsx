import { Layout } from "@/src/components/base/Layout";
import { useAppTheme } from "@/src/constants/theme";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

interface SearchBarProps {
  onSearch: (query: string) => void;
  theme: ReturnType<typeof useAppTheme>;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, theme }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <View
      style={[
        styles.searchContainer,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
      ]}
    >
      <TextInput
        placeholder="How are you feeling?..."
        placeholderTextColor={theme.colors.textLight}
        style={[
          styles.searchInput,
          {
            color: theme.colors.text,
            fontSize: theme.typography.sizes.base,
          },
        ]}
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
      />
    </View>
  );
};

const ExploreScreen: React.FC = () => {
  const theme = useAppTheme();
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = (query: string) => {
    // Implement your search logic here
  };

  return (
    <Layout scroll>
      <SearchBar onSearch={handleSearch} theme={theme} />

      {/* Search Results */}
      {searchResults.length > 0 && (
        <View style={styles.sectionContainer}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text,
                fontSize: theme.typography.sizes.xl,
              },
            ]}
          >
            Search Results
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {searchResults.map((destination) => (
              <>{/* TODO: Search Result card */}</>
            ))}
          </ScrollView>
        </View>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
  },
  searchInput: {
    padding: 12,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
    fontWeight: "bold",
  },
});

export default ExploreScreen;
