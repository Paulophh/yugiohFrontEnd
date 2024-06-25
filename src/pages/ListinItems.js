import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Card, Image, Text, SimpleGrid, Button, Flex } from "@chakra-ui/react";

const ListinItems = () => {
    const [cards, setCards] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 20;
    const navigate = useNavigate();

    const getCards = async () => {
        try {
            const apiResponse = await axios.get("https://db.ygoprodeck.com/api/v7/cardinfo.php");
            setCards(apiResponse.data.data);
            console.log(apiResponse);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCards();
    }, []);

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

    const totalPages = Math.ceil(cards.length / cardsPerPage);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const detailsCards = (name) => {
        navigate(`/cards/${name}`);
    };

    if (!cards.length) {
        return <div>Carregando</div>;
    }

    return (
        <Box>
            <Header title="Listagem de Cartas do Anime Yugioh"></Header>
            <SimpleGrid columns={[1, 2, 3, 4]} spacing={6} margin={3}>
                {currentCards.map((card, index) => (
                    <Card key={index} border="1px solid #ccc" borderRadius="8px" boxShadow="md" p={4} width="350px" height="550px" alignItems="center">
                        <Image src={card.card_images[0].image_url} alt={card.name} height="400px" />
                        <Text fontSize="md" fontWeight="bold" mt="2" textAlign="center">{card.name}</Text>
                        <Text fontSize="md" mt="2" textAlign="center">{card.type}</Text>
                        <Button onClick={() => detailsCards(card.name)} bgColor="blue.100" width="100px" marginTop={1}>Detalhes</Button>
                    </Card>
                ))}
            </SimpleGrid>
            <Flex justifyContent="center" alignItems="center" mt={4}>
                <Button onClick={handlePreviousPage} disabled={currentPage === 1} mr={2}>
                    Anterior
                </Button>
                <Text mx={2}>
                    Página {currentPage} de {totalPages}
                </Text>
                <Button onClick={handleNextPage} disabled={currentPage === totalPages} ml={2}>
                    Próxima
                </Button>
            </Flex>
        </Box>
    );
};

export default ListinItems;
