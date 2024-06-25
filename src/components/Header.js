import { Box, Text } from "@chakra-ui/react"

const Header = ({title}) => {
    return (
        <Box bgColor="blue.200" w="100%" padding={4}>
             <Text color="white" fontSize="24px">{title}</Text>
        </Box>
    )
}

export default Header