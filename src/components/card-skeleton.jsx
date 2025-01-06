import * as S from './card-skeleton.style.js'

const CardSkeleton = () => {
    return (
        <S.Container>
            <S.CardMain/>
            <S.TextWrapper>
                <S.TitleBox/>
                <S.DescriptionBox/>
            </S.TextWrapper>
        </S.Container>
    );
};

export default CardSkeleton;