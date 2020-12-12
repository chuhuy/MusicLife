import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import React from 'react';
import ArrowLeft from '../assets/icons/arrow-left.svg';
import I18n from '../i18n';
import Explore from '../modules/home/explore';
import GenreDetail from '../modules/home/explore/genre-detail';
import GenreListScreen from '../modules/home/explore/genre-list';
import NotificationScreen from '../modules/home/notification';
import Playlist from '../modules/home/playlist';
import PlaylistDetail from '../modules/home/playlist-detail';
import Search from '../modules/home/search';
import Singer from '../modules/home/singer';
import Song from '../modules/home/song';
import { Screen } from '../shared/constance/screen';
import { styleVars } from '../shared/constance/style-variables';

const ExploreStack = createStackNavigator();

export const screenOptions: StackNavigationOptions = {
    headerTintColor: styleVars.white,
    headerTitleAlign: 'center',
    headerStyle: {
        backgroundColor: styleVars.lightPrimaryColor,
        height: 70,
    },
    headerTitleStyle: {
        fontSize: styleVars.bigFontSize,
        fontWeight: '600',
        letterSpacing: 1,
    },
    headerBackImage: () => <ArrowLeft />,
};

const ExploreNavigator: React.FunctionComponent = () => {
    const hideHeader = {
        headerShown: false,
    };

    return (
        <>
            <ExploreStack.Navigator screenOptions={screenOptions}>
                <>
                    <ExploreStack.Screen
                        name={Screen.Explore.Main}
                        component={Explore}
                        options={hideHeader}
                    />

                    <ExploreStack.Screen
                        name={Screen.Common.PlaylistDetail}
                        component={PlaylistDetail}
                        options={hideHeader}
                    />

                    <ExploreStack.Screen
                        name={Screen.Common.Playlist}
                        component={Playlist}
                        options={({ route }) => ({
                            title: route.params.isLatest ? I18n.translate('explore.latest-album') : I18n.translate('common.album') 
                        })}
                    />

                    <ExploreStack.Screen
                        name={Screen.Common.Song}
                        component={Song}
                        options={({ route }) => ({
                            title: route.params.isLatest ? I18n.translate('explore.latest-song') : I18n.translate('common.song')
                        })}
                    />

                    <ExploreStack.Screen
                        name={Screen.Explore.GenreList}
                        component={GenreListScreen}
                        options={{
                            title: I18n.translate('explore.genre'),
                        }}
                    />

                    <ExploreStack.Screen
                        name={Screen.Explore.GenreDetail}
                        component={GenreDetail}
                        options={({ route }) => ({
                            title: route.params.genre.name,
                        })}
                    />

                    <ExploreStack.Screen
                        name={Screen.Common.Search}
                        component={Search}
                        options={hideHeader}
                    />

                    <ExploreStack.Screen
                        name={Screen.Common.Singer}
                        component={Singer}
                        options={hideHeader}
                    />

                    <ExploreStack.Screen
                        name={Screen.Common.Notification}
                        component={NotificationScreen}
                    />
                </>
            </ExploreStack.Navigator>
        </>
    );
};

export default ExploreNavigator;
