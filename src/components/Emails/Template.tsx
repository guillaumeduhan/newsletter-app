import { Body, Container, Head, Hr, Html, Row, Section, Tailwind } from "@react-email/components";
import { Img } from '@react-email/img';
import { Link } from '@react-email/link';
import { Text } from '@react-email/text';

interface Props {
  content: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export default function Template({ content = 'Hello world' }: Props) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="font-sans text-gray-400 bg-gray-100 py-6">
          <Container className="my-6 bg-white shadow-sm">
            <Img
              src={`${baseUrl}/banner.png`}
              width="100%"
              height="auto"
              alt="Codewithguillaume's newsletter"
            />
            <Section className="mx-6 my-6 text-[16px] leading-[23px]">
              <div dangerouslySetInnerHTML={{ __html: content }} />
              <Hr />
              <Row>
                <Text>
                  Thanks to follow this NL,<br />👋 See you next sunday!<br />— Guillaume (@blackevilgoblin)
                </Text>
                <Link href="https://www.youtube.com/@codewithguillaume">👉 Subscribe to my Youtube Channel</Link>
              </Row>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}