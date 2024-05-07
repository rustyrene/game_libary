import { Button, HStack, Image, List, ListItem, Spinner, Tooltip } from '@chakra-ui/react';
import useGenres, { Genre } from '../hooks/useGenres'
import getCroppedImageUrl from '../services/image-url';

interface Props {
  onSelectGenre: (genre: Genre) => void;
}

const GenreList = ({ onSelectGenre }: Props) => {
    const { data, isLoading, error } = useGenres();
    
    if (error) return null;
    if (isLoading) return <Spinner />

    const abbreviate = (word: string) => {
      if (word.length > 12) {
        return word.split(" ").map(word => word[0]).join("");
      }
      return word;
    } 

  return (
    <List>
        {data.map(genre => <ListItem key={genre.id} paddingY={'5px'}>
            <HStack>
              <Image boxSize={'32px'} borderRadius={8} src={getCroppedImageUrl(genre.image_background)} />
              <Button onClick={() => onSelectGenre(genre)} fontSize={'lg'} variant={'link'}><Tooltip label={genre.name}>{abbreviate(genre.name)}</Tooltip></Button>
            </HStack>
          </ListItem>)}
    </List>
  )
}

export default GenreList