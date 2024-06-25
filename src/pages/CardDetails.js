import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import { Badge, Box, Card, Image, Text, Heading, Button, Stack, CardFooter, CardBody, Divider, ButtonGroup, Tag } from "@chakra-ui/react";

const CardDetails = () => {
    const { name } = useParams();
    const [cardDetails, setCardDetails] = useState(null);

    const getCardDetails = async () => {
        try {
            const apiResponse = await axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${name}`);
            setCardDetails(apiResponse.data.data[0]);
            console.log(apiResponse);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (name) {
            getCardDetails();
        }
    }, [name]);

    if (!cardDetails) {
        return <div>Carregando</div>;
    }

    return (
    <Box>
      <Header title="Detalhes da Carta do Anime Yugioh" />
        <Box>
          <Card maxW="sm" margin={1}>
            <CardBody >
              <Image src={cardDetails.card_images[0].image_url}alt={cardDetails.name} height="400px"/>
              <Tag bgColor="black" color="white" margin={1}> Ataque: {cardDetails.atk}</Tag>
              <Tag bgColor="black" color="white" margin={1}> Defesa: {cardDetails.def}</Tag>
              <Tag bgColor="black" color="white" margin={1}> Nivel: {cardDetails.level}</Tag>
              <Stack mt="6" spacing="3">
                <Heading size="md">{cardDetails.name}</Heading>
                <Text>{cardDetails.desc}</Text>
                <Badge color="black.600"  bg="white">{cardDetails.type}</Badge>
                <Badge color="black.600"  bg="white">{cardDetails.attribute}</Badge>
                <Badge color="black.600"  bg="white">{cardDetails.frameType}</Badge>
              </Stack>
            </CardBody>
          </Card>
        </Box>
    </Box>
      );
    };
    
    export default CardDetails;