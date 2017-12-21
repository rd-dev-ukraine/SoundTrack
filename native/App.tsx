import * as React from 'react';
import { Provider } from "react-redux";
import { AsyncStorage, View, ActivityIndicator, StyleSheet } from 'react-native';

import { asyncStorageKey } from "../common/constants";
import { AppNav } from './navigation/AppNavigation';
import { store } from './store/store';
import { authLoggedIn } from "../common/actions/auth";

interface AppComponentState {
  isProfileFetched: boolean;
}

export class App extends React.Component<{}, AppComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      isProfileFetched: false
    }
  }

  componentWillMount() {
    AsyncStorage.getItem(`${asyncStorageKey}:profile`).then(stringifiedProfile => {
      if (stringifiedProfile) {
        const profile: User = JSON.parse(stringifiedProfile);
        store.dispatch(authLoggedIn(profile));
      }
      this.setState({ isProfileFetched: true });
    })
  }

  render() {
    return (
      <Provider store={store}>
        {this.state.isProfileFetched ?
          <AppNav />
          :
          <View style={styles.container}>
            <ActivityIndicator size="large" />
          </View>
        }
      </Provider>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

