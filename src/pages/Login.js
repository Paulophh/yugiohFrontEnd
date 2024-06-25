import { Box, Button, Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import Header from "../components/Header"
import { LuUser2 } from "react-icons/lu";
import { CiLock } from "react-icons/ci";
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigate } from "react-router-dom";




const schema = yup.object({
    login : yup.string().required(),
    senha : yup.string().min(8, "Senha deve ter no minimo 8 caracter").required()
}).required()

const Login = () => {
    const {register, handleSubmit, watch, formState: {errors}, } = useForm({resolver : yupResolver(schema)})
    const navigate = useNavigate();

    const onSubmit = () => {
        navigate('/')
    }
    return (
    <Box>
        <Header title="Login"></Header>
        <Flex gap={8} direction="column" maxWidth padding={10} alignItems="center">
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputGroup>
                    <InputLeftElement pointEvents="none">
                        <LuUser2/>
                    </InputLeftElement>
                    <Input placeholder="Login" {...register("login", {required :true})} marginBottom={4}></Input>
                </InputGroup>
                <p>{errors.login?.message}</p>
                <InputGroup>
                    <InputLeftElement pointEvents="none">
                         <CiLock />
                    </InputLeftElement>
                    <Input placeholder="Senha" {...register("senha", {required :true})}></Input>
                </InputGroup>
                <p>{errors.senha?.message}</p>
                <Button type="submit" marginTop={3} maxWidth>Entrar</Button>
            </form>
        </Flex>
    </Box>
    )
}

export default Login