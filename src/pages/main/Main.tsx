import { Heading, VStack, Text, SimpleGrid, keyframes, useMediaQuery, HStack, Spacer } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import React, { Dispatch, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import LocalizedStrings from 'react-localization';
import Marquee from 'react-fast-marquee';
import { Helmet } from 'react-helmet';

import { Footer } from '../../components/footer/Footer';
import { Header } from '../../components/header/Header';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import { IRootState } from '../../interfaces/IRootState';
import { BlockInfo } from '../../components/blockInfo/BlockInfo';
import { ModalsEnum } from '../../enums/ModalsEnum';
import { RootActions } from '../../types/RootActions';
import { coreSetVisibleModal } from '../../actions/coreActions';
import { ModalProductInfo } from '../../components/modals/ModalProductInfo';
import { IProductInfoState } from '../../interfaces/IProductInfoState';
import chats from '../../assets/darkchat/chats.png';
import chatsModal from '../../assets/darkchat/chatsModal.png';
import menu from '../../assets/darkchat/menu.png';
import menuHover from '../../assets/darkchat/menuHover.png';
import { ROUTE_CONTACTS } from '../../constants/routes';
import { ModalImages } from '../../components/modals/ModalImages';

export const Main = React.memo(() => {
  const { height } = useWindowDimensions();
  const texts = new LocalizedStrings({
    EN: {
      slogan: 'Less talking keep working',
      sponsor: 'The future is foggy, but it is ours',
      ourProducts: 'Products',
      ourProductsInfo:
        'We develop our own products, our philosophy is to create innovative resources and solutions that make life easier for ordinary people and help companies and enterprises to automate routine processes, thereby increasing profits.',
      darkChatProductInfo:
        'EOS AI is a multifunctional neural network solution integrated into Telegram. The development makes it possible to significantly simplify the work of call center managers by providing them with a convenient tool for automatically assessing the quality of customer service.',
      ourProjects: 'Projects',
      ourProjectsInfo:
        'We love helping people and we love cool ideas, which is why we are happy to participate in the development and support of other projects. We guarantee you a good price and full return.',
      douLike: 'Did you like it? Do you want one too? Write!',
      ourSponsors: 'Sponsors',
      ourSponsorsInfo:
        'Our sponsors, receive constant personal support in the development of their projects, as well as receive carte blanche for unlimited use of all our products.',
      newProduct: 'Expect new products!',
      newSponsor: 'Do you want to be our sponsor?',
      efficiency: 'Efficiency',
      efficiencyText:
        'The products are developed in modern programming languages GO, Elixir, Kotlin and Ceylon. The combination of micro-service architectures with compact monolithic products ensures high reliability and self-recovery after failures in real time.',
      quality: 'Quality',
      qualityText:
        'The systems are configured to work in real time with high decentralization and distributed networks. The operating modes provide both hard and soft versions of real-time systems. The variability of product settings includes maximum user needs.',
      convenience: 'Convenience',
      convenienceText:
        'Comfortable product configuration pages do not require special knowledge to configure all product capabilities. At the same time, it is allowed to limit the roles of users of products, in accordance with their status. The assistance of the website support service for configuring products is provided.',
    },
    RU: {
      slogan: 'Больше дела - меньше слов',
      sponsor: 'Будущее туманно, но оно принадлежит нам',
      ourProducts: 'Продукты',
      ourProductsInfo:
        'Мы занимаемся разработкой собственных продуктов, наша философия заключается в создании инновационных ресурсов и решений, которые облегчат жизнь как простым людям, так и помогут компаниям и предприятиям, автоматизировать рутинные процессы, тем самым увеличивая прибыль.',
      darkChatProductInfo:
        'EOS AI это мультифункциональное нейросетевое решение интегрированное в телеграмм. Разработка позволяет значительно упростить работу руководителей колл-центров, предоставив им удобный инструмент для автоматической оценки качества обслуживания клиентов.',
      ourProjects: 'Проекты',
      ourProjectsInfo:
        'Нам нравится помогать людям и мы любим крутые идеи, именно поэтому мы с удовольствием участвуем в разработке и поддержке других проектов. Гарантируем вам хорошу цену и полную отдачу.',
      douLike: 'Понравилось? Хотите тоже? Пишите!',
      ourSponsors: 'Спонсоры',
      ourSponsorsInfo:
        'Наши спонсоры, получают постоянную персональную поддержку в развитии их проектов, и так же получают карт-бланш на не ограниченное использование всех наших продуктов.',
      newProduct: 'Ожидайте новых продуктов!',
      newSponsor: 'Хотите быть нашим спонсором?',
      efficiency: 'Эффективность',
      efficiencyText:
        'Продукты разработаны на современных языках программирования GO, Elixir, Kotlin и Ceylon. Сочетание микро-сервисных архитектур с компактными монолитными продуктами обеспечивают высокую надёжность и самовостановление после сбоев в режиме реального времени.',
      quality: 'Качество',
      qualityText:
        'Системы настроены на работу в масштабе реального времени с высокой децентрализацией и распределенными сетями. Режимы работы обеспечивают как жёсткий так и мягкий вариант работ систем реального времени. Вариативность настроек продуктов включает максимум потребностей пользователя.',
      convenience: 'Удобство',
      convenienceText:
        'Комфортные страницы конфигурации продуктов не требуют специальных знаний для настройки всех возможностей продуктов. При этом допускается ограничение ролей пользователей продуктов, в соответствии с их статусом. Предусмотрено содействие службы поддержки сайтов по настройке продуктов.',
    },
  });

  const lang = useSelector((state: IRootState) => state.core.lang);
  const dispatch = useDispatch<Dispatch<RootActions>>();

  const handleProductInfoClick = useCallback(() => dispatch(coreSetVisibleModal(ModalsEnum.MAIN_PRODUCT_INFO)), []);

  const isOpenProductInfo = useSelector((state: IRootState) => state.core[ModalsEnum.MAIN_PRODUCT_INFO]);
  const isOpenImages = useSelector((state: IRootState) => state.core[ModalsEnum.MAIN_IMAGES]);

  const [isLargerThan1240] = useMediaQuery('(min-width: 1240px)');
  const [isLargerThan430] = useMediaQuery('(min-width: 430px)');

  const darkChat: IProductInfoState = {
    name: 'DARKCHAT',
    info: `${texts.getString('darkChatProductInfo', lang)}`,
    images: [chats, chatsModal, menu, menuHover],
  };

  const KeyframesNorthLight = keyframes`
    0% {
      background-position: 0% 50%;
    }
    25% {
      background-position: 50% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    75% {
      background-position: 50% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  `;

  const animationNorthLight = `${KeyframesNorthLight} 5s ease-in-out infinite`;

  return (
    <>
      <Helmet>
        <title>ATLAS</title>
      </Helmet>
      <Header />
      <VStack bgColor="brand.dark" minH={`${height}px`} justify="center">
        <VStack w="full" spacing={[6, 8, 10, 12]}>
          <VStack w="full">
            <VStack w="full" borderBottom="2px" borderBottomColor="brand.gray" justify="center" p={[4, 6, 8, 10]}>
              <Heading
                bgGradient="linear(to-l,  #e73c7e, #FA9836,   #23a6d5, #00B6EC)"
                as={motion.div}
                animation={animationNorthLight}
                bgClip="text"
                backgroundSize="400%"
                transform="translate3d(0, 0, 0)"
                fontSize={['3xl', '4xl', '5xl', '6xl', '7xl', '8xl']}
                fontWeight="extrabold"
              >
                ATLAS IT
              </Heading>
              <Text color="brand.lightGray" fontSize={['xs', 'sm', 'md', 'lg']}>
                {texts.getString('slogan', lang)}
              </Text>
            </VStack>
            <VStack
              w="full"
              borderBottom="2px"
              borderBottomColor="brand.gray"
              justify="center"
              px={[4, 6, 8, 10]}
              py={[2, 4]}
            >
              <Text color="brand.lightGray" fontSize={['xs', 'sm', 'md', 'lg']}>
                {texts.getString('sponsor', lang)}
              </Text>
            </VStack>
          </VStack>
          <SimpleGrid columns={isLargerThan1240 ? 3 : 1} w={isLargerThan1240 ? '70%' : '90%'} spacing={[4, 6, 8, 10]}>
            <VStack align="start" spacing={4} maxW={isLargerThan1240 ? '300px' : '1000px'}>
              <Heading fontWeight="bold" fontSize={['lg', 'xl']}>
                {texts.getString('efficiency', lang)}
              </Heading>
              <Text color="brand.lightGray" fontSize={['sm', 'md']}>
                {texts.getString('efficiencyText', lang)}
              </Text>
            </VStack>
            <VStack align="start" spacing={4} maxW={isLargerThan1240 ? '300px' : '1000px'}>
              <Heading fontWeight="bold" fontSize={['lg', 'xl']}>
                {texts.getString('quality', lang)}
              </Heading>
              <Text color="brand.lightGray" fontSize={['sm', 'md']}>
                {texts.getString('qualityText', lang)}
              </Text>
            </VStack>
            <VStack align="start" spacing={4} maxW={isLargerThan1240 ? '300px' : '1000px'}>
              <Heading fontWeight="bold" fontSize={['lg', 'xl']}>
                {texts.getString('convenience', lang)}
              </Heading>
              <Text color="brand.lightGray" fontSize={['sm', 'md']}>
                {texts.getString('convenienceText', lang)}
              </Text>
            </VStack>
          </SimpleGrid>
          <VStack w="full" spacing={4} px={isLargerThan1240 ? '15%' : '5%'}>
            <Heading w="full" fontSize={['lg', 'xl']} alignContent="start">
              {texts.getString('ourProducts', lang)}
            </Heading>
            <SimpleGrid columns={isLargerThan430 ? 3 : 1} w="full" spacing="4px">
              <BlockInfo
                alt={
                  <pre>{`
            :::::::::: ::::::::   ::::::::              :::     ::::::::::: 
            :+:       :+:    :+: :+:    :+:           :+: :+:       :+:      
            +:+       +:+    +:+ +:+                 +:+   +:+      +:+       
          +#++:++#  +#+    +:+ +#++:++#++         +#++:++#++:     +#+        
          +#+       +#+    +#+        +#+         +#+     +#+     +#+         
        #+#       #+#    #+# #+#    #+#         #+#     #+#     #+#          
        ########## ########   ########          ###     ### ###########       
        `}</pre>
                }
                fontSize={['3px', '3px', '3px', '4px', '6px']}
                onClick={handleProductInfoClick}
              />
              <BlockInfo />
              <BlockInfo />
            </SimpleGrid>
          </VStack>
          <VStack w="full" spacing={4} px={isLargerThan1240 ? '15%' : '5%'}>
            <Heading w="full" fontSize={['lg', 'xl']} alignContent="start">
              {texts.getString('ourProjects', lang)}
            </Heading>
            <SimpleGrid columns={isLargerThan430 ? 3 : 1} w="full" spacing="4px">
              <BlockInfo />
              <BlockInfo />
              <VStack spacing={0} p={0} m={0} as={RouterLink} to={ROUTE_CONTACTS}>
                <BlockInfo icon={<AddIcon boxSize="25px" />} toolTipText={texts.getString('douLike', lang)} />
              </VStack>
            </SimpleGrid>
          </VStack>
          <VStack w="full" px={isLargerThan1240 ? '15%' : '5%'} spacing={4}>
            <Heading w="full" fontSize={['lg', 'xl']} alignContent="start">
              {texts.getString('ourSponsors', lang)}
            </Heading>
            <SimpleGrid columns={isLargerThan430 ? 3 : 1} w="full" spacing="4px">
              <BlockInfo />
              <BlockInfo />
              <VStack spacing={0} p={0} m={0} as={RouterLink} to={ROUTE_CONTACTS}>
                <BlockInfo icon={<AddIcon boxSize="25px" />} toolTipText={texts.getString('newSponsor', lang)} />
              </VStack>
            </SimpleGrid>
          </VStack>
        </VStack>
        <Spacer />
        <HStack w="full" overflow="hidden" justifyContent="center" color="white" pt={6}>
          <Marquee gradient={false} direction="left" speed={80}>
            {' - ATLAS IT'.repeat(40)}
          </Marquee>
        </HStack>
        <Footer />
        <ModalProductInfo isOpen={!!isOpenProductInfo} productData={darkChat} />
        <ModalImages isOpen={!!isOpenImages} productData={darkChat} />
      </VStack>
    </>
  );
});
