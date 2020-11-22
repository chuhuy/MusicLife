import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import PlaylistDetail from '../modules/home/playlist-detail';
import LatestPlaylist from '../modules/home/explore/latest-album';
import LastestSong from '../modules/home/explore/lastest-song';
import { Screen } from '../shared/constance/screen';
import Explore from '../modules/home/explore';
import GenreListScreen from '../modules/home/explore/genre-list';

const ExploreStack = createStackNavigator();

interface Props extends StateProps {}

const mapStateToProps = (state: any) => ({
    refresh_token: state.auth.refresh_token,
});

const ExploreNavigator: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <>
            <ExploreStack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <>
                    <ExploreStack.Screen name={Screen.Explore.Main} component={Explore}/>
                    <ExploreStack.Screen name={Screen.Common.PlaylistDetail} component={PlaylistDetail}/>
                    <ExploreStack.Screen name={Screen.Explore.Playlist} component={LatestPlaylist}/>
                    <ExploreStack.Screen name={Screen.Explore.LatestSong} component={LastestSong}/>
                    <ExploreStack.Screen name={Screen.Explore.GenreList} component={GenreListScreen}/>
                </>
            </ExploreStack.Navigator>
        </>
    );
};

type StateProps = ReturnType<typeof mapStateToProps>

export default connect(mapStateToProps, null)(ExploreNavigator);
