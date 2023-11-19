import { Button } from "@react-email/button";
import { Body, Container, Head, Hr, Html, Section, Tailwind } from "@react-email/components";
import { Text } from '@react-email/text';

interface Props {
  code: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `http://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

const CodewithgTemplate = ({ code }: Props) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="font-sans text-gray-400 bg-gray-100 py-6">
          <Container className="my-6 bg-white shadow-sm">
            <Section className="mx-6 my-6 text-[16px] leading-[23px]">
              <Text>Click the link down below if you want to unsubscribe</Text>
              <Button
                href={`${baseUrl}/api/unsubscribe?code=${code}`}
                style={{ color: "black", padding: "10px 20px" }}
              >
                Unsubscribe
              </Button>
              <Hr />
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default CodewithgTemplate